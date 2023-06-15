use wasm_bindgen::prelude::*;
use rav1e::{Config, Context, SpeedSettings, EncoderConfig, Frame};
use image::{self, DynamicImage, ImageBuffer, Rgba};
use avif_serialize::{prelude::*, AvifSerialize};
use std::io::{Write, Cursor};
use std::error::Error;
use libwebp::WebPConfigPreset;
use image::{GenericImageView, ImageFormat};
use exif::{Reader, In, Field};
use std::io::prelude::*;
use image::{ImageDecoder, ImageDecoderExt};
use std::cmp::min;
use kamadak_exif::{Exif, Reader};
use std::io::{Cursor, Read};
use std::os::raw::c_void;
use std::ptr::null_mut;
use imageproc::definitions::Image;
use imageproc::contrast::{root_mean_square_contrast, local_contrast};
use imageproc::noise::gaussian_noise;
use image::{DynamicImage, Rgba};
use rayon::prelude::*;

// Main encoding function callable from JavaScript

#[wasm_bindgen]
pub fn encode_image(data: &[u8], quality: u8, speed: u8, chroma_subsampling: u8, smart_encoding: bool) -> Result<Vec<u8>, JsValue> {

    // Detect quality settings
    let mut actual_quality = quality;
    if smart_encoding {
        let image_detail = analyze_image_detail(&input_image);
        let image_noise = analyze_image_noise(&input_image);
        
        // Adjust quality and other settings based on image characteristics
        actual_quality = calculate_optimal_quality(image_detail, image_noise);
    }

    // Detect the image format and handle errors
    let format = match image::guess_format(data) {
        Ok(fmt) => fmt,
        Err(e) => return Err(JsValue::from_str(&format!("Error guessing image format: {}", e.description())))
    };
    
    // Decode the input image based on the detected format, with special handling for WebP images
    let input_image = match format {
        ImageFormat::WebP => {
            let mut config = libwebp::WebPConfig::new();
            let _ = config.preset(WebPConfigPreset::Default, quality as f32);
            let decoder = libwebp::WebPDecoder::new(&config);
            let decoded = decoder.decode(data).unwrap();
            DynamicImage::ImageRgba8(ImageBuffer::from_raw(decoded.0, decoded.1, decoded.2).unwrap())
        }
        _ => {
            match image::load_from_memory_with_format(data, format) {
                Ok(img) => img,
                Err(e) => return Err(JsValue::from_str(&format!("Error decoding input image: {}", e.description())))
            }
        }
    };

    // Extract EXIF metadata from the input image and store it in a Vec<u8>
    let exif_data = match Reader::new(&data) {
        Ok(reader) => {
            let exif = Exif::read_from_container(&*reader)?;
            let mut cursor = Cursor::new(Vec::new());
            exif.write_to_container(&mut cursor)?;
            let exif_bytes = cursor.into_inner();
            Some(exif_bytes)
        }
        Err(_) => None
    };

    // Decode the input image data using the "image" crate
    let input_image = match image::load_from_memory(data) {
        Ok(img) => img,
        Err(e) => return Err(JsValue::from_str(&format!("Error decoding input image: {}", e.description())))
    };

    // Convert the input image to RGBA format
    let rgba_image = input_image.to_rgba8();
    let (width, height) = rgba_image.dimensions();

    // Configure rav1e encoder
    let mut encoder_config = EncoderConfig::with_speed_preset(speed);
    encoder_config.quantizer = quality as f64;

    // Set chroma subsampling
    let chroma_sampling = match chroma_subsampling {
        1 => ChromaSampling::Cs420,
        2 => ChromaSampling::Cs422,
        3 => ChromaSampling::Cs444,
        _ => ChromaSampling::Cs420, // Default value
    };

    // Configure the frame size, color format, and other settings based on input image properties
    let config = Config::new()
        .with_encoder_config(encoder_config)
        .with_speed_settings(SpeedSettings::from_preset(speed))
        .with_dimensions(width, height)
        .with_bit_depth(8)
        .with_color_description(None)
        .with_matrix_coefficients(None); // use the default matrix coefficients

    // Create a new encoding context
    let ctx: Context<u16> = match config.new_context() {
        Ok(ctx) => ctx,
        Err(e) => return Err(JsValue::from_str(&format!("Error creating context: {}", e.description())))
    };

    // Convert the RGBA image to a rav1e-compatible frame
    let frame = rgba_to_rav1e_frame(&rgba_image);

    // Send the frame to the encoder
    if let Err(e) = ctx.send_frame(frame) {
        return Err(JsValue::from_str(&format!("Error sending frame: {}", e.description())));
    }

    // Flush the encoder
    if let Err(e) = ctx.flush() {
        return Err(JsValue::from_str(&format!("Error flushing encoder: {}", e.description())));
    }

    // Fetch the encoded data and assemble it into an AVIF container using the "avif-serialize" crate
    let mut output = Cursor::new(Vec::new());
    while let Ok(packet) = ctx.receive_packet() {
        let avif_data = packet.data.clone();

    let avif_config = Av1Config {
        av1_data: avif_data,
        width: width as u32,
        height: height as u32,
        bit_depth: 8,
        chroma_subsampling: ChromaSampling::Cs444,
        alpha_data: encoded_alpha_data,
        alpha_quality: Some(quality as f64),
        exif_data,
        ..Default::default()
    };

        let avif = Avif::from_av1_config(avif_config);

        if let Err(e) = avif.serialize(&mut output) {
            return Err(JsValue::from_str(&format!("Error writing AVIF data: {}", e.description())));
        }
    }

    // After encoding the main image data, encode the alpha channel if the input image has transparency
    let encoded_alpha_data = match encode_alpha_channel(&rgba_image, quality, speed) {
        Ok(data) => Some(data),
        Err(e) => return Err(JsValue::from_str(&format!("Error encoding alpha channel: {}", e.description())))
    };

    Ok(output.into_inner())
}

// Performs a proper color-space conversion from RGBA to YCbCr
fn rgba_to_rav1e_frame(rgba_image: &ImageBuffer<Rgba<u8>, Vec<u8>>) -> Frame<u16> {
    let (width, height) = rgba_image.dimensions();

    let mut frame = Frame::new(width as usize, height as usize);

    // Perform conversion from RGBA to YCbCr
    let rgba_pixels: &[RGBA8] = rgba_image.as_flat_samples().samples.as_slice().unwrap();
    let ycbcr_pixels: Vec<YCbCr8> = rgba_pixels.iter().map(|px| px.clone().into()).collect();

    // Copy pixel data from RGBA image to rav1e frame
    for y in 0..height {
        for x in 0..width {
            let idx = (y * width + x) as usize;
            let ycbcr = ycbcr_pixels[idx];

            let y = (ycbcr.y as u16) << 2;
            let cb = (ycbcr.cb as u16) << 2;
            let cr = (ycbcr.cr as u16) << 2;

            frame.planes[0].p(x as usize, y as usize, y);
            frame.planes[1].p(x as usize, y as usize, cb);
            frame.planes[2].p(x as usize, y as usize, cr);
        }
    }

    frame
}

// Helper function to encode the alpha channel as a separate image
fn encode_alpha_channel(rgba_image: &ImageBuffer<Rgba<u8>, Vec<u8>>, quality: u8, speed: u8) -> Result<Vec<u8>, Box<dyn Error>> {
    let (width, height) = rgba_image.dimensions();

    let mut encoder_config = EncoderConfig::with_speed_preset(speed);
    encoder_config.quantizer = quality as f64;

    let config = Config::new()
        .with_encoder_config(encoder_config)
        .with_speed_settings(SpeedSettings::from_preset(speed))
        .with_dimensions(width, height)
        .with_bit_depth(8)
        .with_color_description(None)
        .with_matrix_coefficients(None);

    let ctx: Context<u16> = config.new_context()?;
    let alpha_frame = extract_alpha_channel(rgba_image);

    ctx.send_frame(alpha_frame)?;
    ctx.flush()?;

    let mut output = vec![];
    while let Ok(packet) = ctx.receive_packet() {
        output.extend(packet.data);
    }

    Ok(output)
}

// Helper function to extract the alpha channel and create a rav1e frame containing only alpha values
fn extract_alpha_channel(rgba_image: &ImageBuffer<Rgba<u8>, Vec<u8>>) -> Frame<u16> {
    let (width, height) = rgba_image.dimensions();

    let mut frame = Frame::new(width as usize, height as usize);

    for (y, row) in rgba_image.rows().enumerate() {
        for (x, &rgba) in row.enumerate() {
            let a = (rgba[3] as u16) << 2;
            frame.planes[0].p(x as usize, y as usize, a);
        }
    }

    frame
}

// Analyze image detail by calculating local contrast and Root Mean Square (RMS) contrast
fn analyze_image_detail(image: &DynamicImage) -> (f32, f32) {
    let grayscale_image = image.to_luma8();
    let local_contrast_value = local_contrast(&grayscale_image);
    let rms_contrast_value = root_mean_square_contrast(&grayscale_image);

    (local_contrast_value, rms_contrast_value)
}

// Analyze image noise by calculating the standard deviation of the Gaussian noise
fn analyze_image_noise(image: &DynamicImage) -> f64 {
    let grayscale_image = image.to_luma8();
    let (mean, stddev) = gaussian_noise(&grayscale_image);

    stddev
}

// Calculate optimal encoding quality based on image detail and noise
fn calculate_optimal_quality(image_detail: (f32, f32), image_noise: f64) -> u8 {
    let (local_contrast, rms_contrast) = image_detail;

    // Depending on the calculations, you can provide weights to balance image details and noise
    let detail_weight = 0.5; 
    let noise_weight = 0.5;

    let detail_score = (local_contrast + rms_contrast) / 2.0;
    let quality_from_detail = (detail_score * detail_weight * 100.0) as u8;

    let quality_from_noise = (image_noise * noise_weight * 100.0) as u8;

    // You can adjust the calculation method to balance the image detail and noise results.
    let optimal_quality = (quality_from_detail + quality_from_noise) / 2;

    optimal_quality
}