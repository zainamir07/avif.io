#![cfg(feature = "build-wasm")]

use std::mem;

use image::RgbaImage;
use wasm_bindgen::prelude::*;

use crate::avif;
pub use crate::avif::ConversionOptions;
pub use crate::Subsampling;

#[wasm_bindgen]
pub struct ConversionResult {
    pub data: *const u8,
    pub size: usize,
    pub error: *const u8,
    pub error_size: usize,
}

#[wasm_bindgen]
impl ConversionResult {
    fn from_data(v: Vec<u8>) -> ConversionResult {
        let data = v.as_ptr();
        let size = v.len();
        mem::forget(v);
        ConversionResult { data, size, error: 0 as *const u8, error_size: 0 }
    }

    fn from_error(message: String) -> ConversionResult {
        let error = message.as_ptr();
        let error_size = message.len();
        ConversionResult { data: 0 as *const u8, size: 0, error, error_size }
    }
}

#[wasm_bindgen]
pub fn convert_to_avif(
    input_data: &[u8],
    options: &ConversionOptions,
) -> ConversionResult {

    match avif::convert_to_avif(input_data, options) {
        Ok(data) => ConversionResult::from_data(data),
        Err(e) => ConversionResult::from_error(e.to_string()),
    }
}

/// A special function for WebP.
#[wasm_bindgen]
pub fn rgba_to_avif(
    input_data: &[u8],
    options: &ConversionOptions,
    width: usize,
    height: usize,
) -> ConversionResult {

    let image = RgbaImage::from_raw(
        width as u32,
        height as u32,
        Vec::from(input_data),
    ).unwrap();
    let result_data = avif::convert_rgba_to_avif(&image, options);
    ConversionResult::from_data(result_data)
}

