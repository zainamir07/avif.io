//option_palette_reduction.rs

use crate::ConversionOptions;
use image::{RgbaImage};
use color_quant::{NeuQuant};

// Reduce the color palette of the provided image using the specified options.
pub fn reduce_palette(image: &RgbaImage, options: &ConversionOptions) -> RgbaImage {
    if options.enable_palette_reduction {
        let palette_size = options.palette_size.unwrap_or(256) as u32;
        let color_map = NeuQuant::new(10, palette_size as usize, &image);
        let mut dithered_image = image.clone();
        image::imageops::colorops::dither(&mut dithered_image, &color_map);
        dithered_image
    } else {
        image.clone()
    }
}