// option_adapt.rs
// Adapt the conversion settings based on the provided image and its computed attributes.

use crate::{ConversionOptions, Subsampling};


pub fn adapt_options(options: &ConversionOptions, image_data: (f32, f32, f32)) -> ConversionOptions {
    let (avg_color_diff, edge_density, colorfulness) = image_data;
    let mut new_options = options.clone();

    // Adjust the quality setting based on the average color difference and colorfulness
    if avg_color_diff < 10.0 && colorfulness < 0.5 {
        new_options.quality = (new_options.quality as f32 * 0.8).clamp(0.0, 100.0) as u8;
    } else if avg_color_diff > 30.0 || colorfulness > 1.5 {
        new_options.quality = (new_options.quality as f32 * 1.2).clamp(0.0, 100.0) as u8;
    }

    // Adjust the subsampling mode based on edge density and colorfulness
    if edge_density > 0.1 || colorfulness > 1.5 {
        new_options.subsampling = Subsampling::YUV444;
    } else {
        new_options.subsampling = Subsampling::YUV420;
    }

    // Adjust the effort setting based on the image complexity (higher edge density or colorfulness indicates more complexity)
    if edge_density > 0.2 || colorfulness > 1.5 {
        new_options.effort = (new_options.effort as f32 * 1.1).clamp(0.0, 100.0) as u8;
    } else {
        new_options.effort = (new_options.effort as f32 * 0.9).clamp(0.0, 100.0) as u8;
    }

    new_options
}