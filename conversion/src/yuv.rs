// Import necessary image modules
use image::imageops::FilterType;
use image::{imageops, GenericImageView, ImageBuffer, Pixel, Rgb, RgbaImage};
use wasm_bindgen::prelude::*;

// Define YUV data structure
pub struct YUV {
    pub y: Vec<u8>,
    pub u: Vec<u8>,
    pub v: Vec<u8>,
    pub subsampling: Subsampling,
}

// Define supported YUV subsampling formats
#[wasm_bindgen]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
pub enum Subsampling {
    YUV420 = 0,
    YUV444 = 1,
    YUV400 = 2,
}

// Create YUV struct using alpha channel data
pub fn from_alpha(alpha: &[u8]) -> YUV {
    YUV {
        y: Vec::from(alpha),
        u: Vec::new(),
        v: Vec::new(),
        subsampling: Subsampling::YUV400,
    }
}

// Create YUV struct given an RGBA image and a subsampling type
pub fn from_image(image: &RgbaImage, subsampling: Subsampling) -> YUV {
    let mut yuv = YUV {
        y: Vec::new(),
        u: Vec::new(),
        v: Vec::new(),
        subsampling,
    };

    // Convert RGB to Y values for luma channel
    for rgba in image.pixels() {
        yuv.y.push(rgb8_to_y(&rgba.to_rgb()));
    }

    let subsampled_image;

    let image = match subsampling {
        // Process subsampling based on the selected format
        Subsampling::YUV420 => {
            subsampled_image = subsampled(image);
            &subsampled_image
        }
        Subsampling::YUV444 => image,
        // Return unimplemented if YUV400 is chosen
        Subsampling::YUV400 => unimplemented!(),
    };

    // Convert RGB to UV values for chroma channels
    for rgba in image.pixels() {
        let (u, v) = rgb8_to_uv(&rgba.to_rgb());
        yuv.u.push(u);
        yuv.v.push(v);
    }

    yuv
}

// Downscale image by a factor of 2 in both dimensions using triangle filtering
fn subsampled<I: GenericImageView>(
    image: &I,
) -> ImageBuffer<I::Pixel, Vec<<I::Pixel as Pixel>::Subpixel>>
where
    I::Pixel: 'static,
    <I::Pixel as Pixel>::Subpixel: 'static,
{
    let (w, h) = image.dimensions();
    imageops::resize(image, w / 2, h / 2, FilterType::Triangle)
}

// Convert Rgb<u8> pixel to luma (Y) value
fn rgb8_to_y(rgb: &Rgb<u8>) -> u8 {
    let r = rgb.0[0] as i32;
    let g = rgb.0[1] as i32;
    let b = rgb.0[2] as i32;

    (((66 * r + 129 * g + 25 * b + 128) >> 8) + 16) as u8
}

// Convert Rgb<u8> pixel to chroma (U and V) values
fn rgb8_to_uv(rgb: &Rgb<u8>) -> (u8, u8) {
    let r = rgb.0[0] as i32;
    let g = rgb.0[1] as i32;
    let b = rgb.0[2] as i32;

    (
        (((-38 * r - 74 * g + 112 * b + 128) >> 8) + 128) as u8,
        (((112 * r - 94 * g - 18 * b + 128) >> 8) + 128) as u8,
    )
}
