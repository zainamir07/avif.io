// Enable the build-wasm feature
#![cfg(feature = "build-wasm")]

// Import necessary libraries
use image::RgbaImage;
use std::mem;
use wasm_bindgen::prelude::*;

// Import local modules
use crate::avif;
pub use crate::avif::ConversionOptions;
pub use crate::Subsampling;

// Define a public structure for ConversionResult
#[wasm_bindgen]
pub struct ConversionResult {
    pub data: *const u8,
    pub size: usize,
    pub error: *const u8,
    pub error_size: usize,
}

// Implement methods for the ConversionResult struct
#[wasm_bindgen]
impl ConversionResult {
    // Create a ConversionResult from successful data
    fn from_data(v: Vec<u8>) -> ConversionResult {
        let data = v.as_ptr();
        let size = v.len();
        mem::forget(v);
        ConversionResult {
            data,
            size,
            error: 0 as *const u8,
            error_size: 0,
        }
    }

    // Create a ConversionResult from an error message
    fn from_error(message: String) -> ConversionResult {
        let error = message.as_ptr();
        let error_size = message.len();
        ConversionResult {
            data: 0 as *const u8,
            size: 0,
            error,
            error_size,
        }
    }
}

// Define the main function to convert input data to AVIF format
#[wasm_bindgen]
pub fn convert_to_avif(input_data: &[u8], options: &ConversionOptions) -> ConversionResult {
    // Match the result of the avif binary conversion
    match avif::convert_to_avif(input_data, options) {
        // On Ok(result), create a ConversionResult from_data
        Ok(data) => ConversionResult::from_data(data),
        // On Err(result), create a ConversionResult from_error
        Err(e) => ConversionResult::from_error(e.to_string()),
    }
}

// Define a special function to handle WebP format
#[wasm_bindgen]
pub fn rgba_to_avif(
    input_data: &[u8],
    options: &ConversionOptions,
    width: usize,
    height: usize,
) -> ConversionResult {
    // Create an image object using the input data, width, and height
    let image = RgbaImage::from_raw(width as u32, height as u32, Vec::from(input_data)).unwrap();

    // Convert the RGBA image to AVIF format
    let result_data = avif::convert_rgba_to_avif(&image, options);

    // Create a new ConversionResult using the result_data
    ConversionResult::from_data(result_data)
}
