// options.rs

use wasm_bindgen::prelude::*;
use crate::Subsampling;

#[wasm_bindgen]
#[derive(Clone)]
pub struct ConversionOptions {
    pub effort: u8,
    pub quality: u8,
    pub subsampling: Subsampling,
    pub keep_transparency: bool,
    pub lossless: bool,
    pub adaptive: bool,
    pub enable_palette_reduction: bool,
    pub palette_size: Option<u32>,
    pub enable_resize: bool,
    pub resize_width: Option<u32>,
    pub resize_height: Option<u32>,
    pub resize_algorithm: u8,
    pub maintain_aspect_ratio: bool,
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
        lossless: bool,
        adaptive: bool,
        enable_palette_reduction: bool,
        palette_size: Option<u32>,
        enable_resize: bool,
        resize_width: Option<u32>,
        resize_height: Option<u32>,
        resize_algorithm: u8,
        maintain_aspect_ratio: bool,
    ) -> Self {
        Self {
            effort,
            quality,
            subsampling,
            keep_transparency,
            lossless,
            adaptive,
            enable_palette_reduction,
            palette_size,
            enable_resize,
            resize_width,
            resize_height,
            resize_algorithm,
            maintain_aspect_ratio,
        }
    }
}

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub enum ResizeAlgorithm {
    Nearest,
    Triangle,
    CatmullRom,
    Gaussian,
    Lanczos3,
}

impl From<u8> for ResizeAlgorithm {
    fn from(value: u8) -> Self {
        match value {
            0 => ResizeAlgorithm::Nearest,
            1 => ResizeAlgorithm::Triangle,
            2 => ResizeAlgorithm::CatmullRom,
            3 => ResizeAlgorithm::Gaussian,
            4 => ResizeAlgorithm::Lanczos3,
            _ => panic!("Invalid ResizeAlgorithm value"),
        }
    }
}