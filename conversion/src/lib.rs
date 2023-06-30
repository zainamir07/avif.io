//lib.rs

// Publicly expose the avif crate's `ConversionOptions` and `convert_to_avif` functions
pub use avif::{convert_to_avif, ConversionOptions};

// Conditionally include the `wasm` module when the "build-wasm" feature is enabled
#[cfg(feature = "build-wasm")]
pub use wasm::*;

// Publicly expose the yuv crate's `Subsampling` type
pub use yuv::Subsampling;

// Include the yuv, wasm, and avif modules
mod avif;
mod wasm;
mod yuv;
mod options;
mod option_resize;
mod option_alpha;
mod option_adapt;
mod option_palette_reduction;
mod analyze_image;


// When both "build-wasm" and "wee_alloc" features are enabled,
// use `wee_alloc` as the global allocator.
#[cfg(feature = "build-wasm")]
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;