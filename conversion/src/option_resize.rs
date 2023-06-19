// option_resize.rs
// Helper function to resize image based on settings

use image::{imageops::FilterType, RgbaImage};
use crate::avif::ConversionOptions;

pub fn resize_image(image: &RgbaImage, options: &ConversionOptions) -> RgbaImage {
    let (width, height) = image.dimensions();
    let new_width = options.resize_width.unwrap_or(width);
    let new_height = options.resize_height.unwrap_or(height);
    let filter_type = match options.resize_algorithm as u8 {
        0 => FilterType::Nearest,
        1 => FilterType::Triangle,
        2 => FilterType::CatmullRom,
        3 => FilterType::Gaussian,
        4 => FilterType::Lanczos3,
        _ => panic!("Invalid ResizeAlgorithm value"),
    };

    if options.maintain_aspect_ratio {
        image::imageops::resize(image, new_width, new_height, filter_type)
    } else {
        image::imageops::thumbnail(image, new_width, new_height)
    }
}