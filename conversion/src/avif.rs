use std::io::Cursor;

use image::{self, error::ImageResult, RgbaImage};
use rav1e::color::ChromaSampling;
use rav1e::prelude::EncoderConfig;
use rav1e::Frame;
use std::convert::TryInto;
use wasm_bindgen::prelude::*;
use image::{Pixel};

use crate::yuv::{self, Subsampling, YUV};

#[wasm_bindgen]
#[derive(Clone)]
pub struct ConversionOptions {
    pub effort: u8,
    pub quality: u8,
    pub subsampling: Subsampling,
    pub keep_transparency: bool,
    pub adaptive: bool,
}

#[wasm_bindgen]
impl ConversionOptions {
    #[cfg(feature = "build-wasm")]
    #[wasm_bindgen(constructor)]
    pub fn new(
        effort: u8,
        quality: u8,
        subsampling: Subsampling,
        keep_transparency: bool,
        adaptive: bool,
    ) -> Self {
        Self {
            effort,
            quality,
            subsampling,
            keep_transparency,
            adaptive,
        }
    }
}

fn analyze_image(image: &RgbaImage) -> (f32, f32) {
    let (width, height) = image.dimensions();
    let mut total_color_diff = 0.0;
    let mut edge_count = 0;

    for y in 0..height - 1 {
        for x in 0..width - 1 {
            let pixel = image.get_pixel(x, y);
            let right_pixel = image.get_pixel(x + 1, y);
            let bottom_pixel = image.get_pixel(x, y + 1);

            let color_diff_right = pixel.to_rgb().map2(&right_pixel.to_rgb(), |a, b| (a as i32 - b as i32).abs() as u8);
            let color_diff_bottom = pixel.to_rgb().map2(&bottom_pixel.to_rgb(), |a, b| (a as i32 - b as i32).abs() as u8);

            let edge_threshold = 30;
            if color_diff_right.to_luma().0[0] > edge_threshold {
                edge_count += 1;
            }
            if color_diff_bottom.to_luma().0[0] > edge_threshold {
                edge_count += 1;
            }

            total_color_diff += color_diff_right.to_luma().0[0] as f32;
            total_color_diff += color_diff_bottom.to_luma().0[0] as f32;
        }
    }

    let num_pixels = (width * height) as f32;
    let avg_color_diff = total_color_diff / (num_pixels * 2.0);
    let edge_density = edge_count as f32 / num_pixels;

    (avg_color_diff, edge_density)
}

fn adapt_options(options: &ConversionOptions, image_data: (f32, f32)) -> ConversionOptions {
    let (avg_color_diff, edge_density) = image_data;
    let mut new_options = options.clone();

    // Adjust the quality setting based on the average color difference
    if avg_color_diff < 10.0 {
        new_options.quality = (new_options.quality as f32 * 0.8).clamp(0.0, 100.0) as u8;
    } else if avg_color_diff > 30.0 {
        new_options.quality = (new_options.quality as f32 * 1.2).clamp(0.0, 100.0) as u8;
    }

    // Adjust the subsampling mode based on edge density
    if edge_density > 0.1 {
        new_options.subsampling = Subsampling::YUV444;
    } else {
        new_options.subsampling = Subsampling::YUV420;
    }

    // Adjust the effort setting based on the image complexity (higher edge density indicates more complexity)
    if edge_density > 0.2 {
        new_options.effort = (new_options.effort as f32 * 1.1).clamp(0.0, 100.0) as u8;
    } else {
        new_options.effort = (new_options.effort as f32 * 0.9).clamp(0.0, 100.0) as u8;
    }

    new_options
}

pub fn convert_to_avif(data: &[u8], options: &ConversionOptions) -> ImageResult<Vec<u8>> {
    let reader = image::io::Reader::new(Cursor::new(data))
        .with_guessed_format()
        .unwrap();
    let image = reader.decode()?.into_rgba8();

    let mut options = options.clone();
    if options.adaptive {
        let image_data = analyze_image(&image);
        options = adapt_options(&options, image_data);
    }

    Ok(convert_rgba_to_avif(&image, &options))
}

pub fn convert_rgba_to_avif(image: &RgbaImage, options: &ConversionOptions) -> Vec<u8> {
    let yuv = yuv::from_image(&image, options.subsampling);
    let (w, h) = image.dimensions();
    if options.keep_transparency {
        let alpha: Vec<_> = alpha_channel(&image).collect();
        encode_avif(&yuv, options, Some(&alpha), w as usize, h as usize)
    } else {
        encode_avif(&yuv, options, None, w as usize, h as usize)
    }
}

pub fn encode_avif(
    yuv: &YUV,
    options: &ConversionOptions,
    alpha: Option<&[u8]>,
    width: usize,
    height: usize,
) -> Vec<u8> {
    assert_eq!(options.subsampling, yuv.subsampling);

    let encoder_config = create_encoder_config(options, width, height);
    let encoded_data = encode_av1_frame(yuv, width, encoder_config);
    match alpha {
        Some(alpha) => {
            let mut encoder_config = EncoderConfig::with_speed_preset(10);
            encoder_config.chroma_sampling = ChromaSampling::Cs400;
            encoder_config.width = width;
            encoder_config.height = height;
            encoder_config.still_picture = true;
            let alpha = encode_av1_frame(&yuv::from_alpha(alpha), width, encoder_config);
            avif_serialize::serialize_to_vec(
                &encoded_data,
                Some(alpha.as_slice()),
                width as u32,
                height as u32,
                8,
            )
        }
        None => {
            avif_serialize::serialize_to_vec(&encoded_data, None, width as u32, height as u32, 8)
        }
    }
}

fn encode_av1_frame(yuv: &YUV, width: usize, encoder_config: EncoderConfig) -> Vec<u8> {
    let mut ctx: rav1e::Context<u8> = rav1e::Config::new()
        .with_encoder_config(encoder_config)
        .with_threads(0)
        .new_context()
        .unwrap();
    let frame = create_av1_frame(yuv, &ctx, width);
    ctx.send_frame(frame).unwrap();
    ctx.flush();
    ctx.receive_packet().unwrap().data
}

fn create_encoder_config(
    options: &ConversionOptions,
    width: usize,
    height: usize,
) -> EncoderConfig {
    assert!(options.effort <= 100);
    assert!(options.quality <= 100);

    let speed = (10 - (options.effort / 20)) as usize;
    let mut encoder_config = EncoderConfig::with_speed_preset(speed.try_into().unwrap());
    encoder_config.quantizer = 255 - (options.quality as usize) * 255 / 100;
    encoder_config.min_quantizer = encoder_config.quantizer as u8;
    encoder_config.chroma_sampling = to_av1_chroma_sampling(options.subsampling);
    encoder_config.width = width;
    encoder_config.height = height;
    encoder_config.still_picture = true;
    encoder_config
}

fn to_av1_chroma_sampling(subsampling: Subsampling) -> ChromaSampling {
    match subsampling {
        Subsampling::YUV420 => ChromaSampling::Cs420,
        Subsampling::YUV444 => ChromaSampling::Cs444,
        Subsampling::YUV400 => ChromaSampling::Cs400,
    }
}

fn create_av1_frame(yuv: &YUV, ctx: &rav1e::Context<u8>, width: usize) -> Frame<u8> {
    let mut frame = ctx.new_frame();
    frame.planes[0].copy_from_raw_u8(&yuv.y, width, 1);
    let stride = match yuv.subsampling {
        Subsampling::YUV444 => width,
        Subsampling::YUV420 => width / 2,
        Subsampling::YUV400 => return frame,
    };
    frame.planes[1].copy_from_raw_u8(&yuv.u, stride, 1);
    frame.planes[2].copy_from_raw_u8(&yuv.v, stride, 1);
    frame
}

pub fn alpha_channel<'a>(image: &'a RgbaImage) -> impl Iterator<Item = u8> + 'a {
    image.pixels().map(|p| p.0[3])
}
