// AVIF File Converter
// In-browser AVIF File Converter
// Built using Rust with WebAssembly (WASM) for a powerful, efficient conversion library
// No server communication required, enabling a streamlined user experience
// Utilizes web workers to run Rust code efficiently and responsively
// Leverages Rust's image library and a WebP library for decoding, and the rav1e encoder for high-quality conversions
// User-friendly interface for seamless navigation and use
// Supports unlimited bulk conversions, making large projects a breeze
// Offers a range of AVIF output options, including effort, quality, lossless conversion, and automatic intelligent settings based on input image
// Provides versatile image manipulation options, such as resizing and alpha channel retention

//avif.rs

use std::io::Cursor;
use std::convert::TryInto;
use image::{self, error::ImageResult, RgbaImage};

use rav1e::color::ChromaSampling;
use rav1e::prelude::EncoderConfig;
use rav1e::Frame;

use crate::yuv::{self, Subsampling, YUV};
pub use crate::analyze_image::analyze_image; // Analyze Image and return values

pub use crate::options::ConversionOptions; // Import ConversionOptions from options module
pub use crate::option_resize::resize_image; // Resize Image Functionality
pub use crate::option_alpha::alpha_channel; // Keep Alpha Channel Functionality
pub use crate::option_adapt::adapt_options; // Adapt Options based on Image
pub use crate::option_palette_reduction::reduce_palette; // Reduce Color Palette

// Convert the provided image data to AVIF format using the specified options.
pub fn convert_to_avif(data: &[u8], options: &ConversionOptions) -> ImageResult<Vec<u8>> {
    let reader = image::io::Reader::new(Cursor::new(data))
        .with_guessed_format()
        .unwrap();
    let mut image = reader.decode()?.into_rgba8();

    // Resize the image if necessary
    if options.enable_resize {
        image = resize_image(&image, options);
    }

    image = reduce_palette(&image, options);

    let mut options = options.clone();
    if options.adaptive {
        let image_data = analyze_image(&image);
        options = adapt_options(&options, image_data);
    }

    Ok(convert_rgba_to_avif(&image, &options))
}

// Convert an RGBA image to AVIF format using the specified options.
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
    if options.lossless {
        // Set quantizer values to 0 for lossless compression
        encoder_config.quantizer = 0;
        encoder_config.min_quantizer = 0;
    } else {
        encoder_config.quantizer = 255 - (options.quality as usize) * 255 / 100;
        encoder_config.min_quantizer = encoder_config.quantizer as u8;
    }
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