pub use avif::{convert_to_avif, ConversionOptions};
#[cfg(feature = "build-wasm")]
pub use wasm::*;
pub use yuv::Subsampling;

mod avif;
mod wasm;
mod yuv;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "build-wasm")]
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
