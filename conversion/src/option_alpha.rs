// option_alpha.rs
// Helped function to remove or keep alpha channel

use image::RgbaImage;

pub fn alpha_channel<'a>(image: &'a RgbaImage) -> impl Iterator<Item = u8> + 'a {
    image.pixels().map(|p| p.0[3])
}