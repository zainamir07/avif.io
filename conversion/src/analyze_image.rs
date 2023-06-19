// analyze_image.rs
// Analyze an image for key attributes such as colorfulness, average color difference, and edge density.

use image::RgbaImage;
use image::{Pixel};

pub fn analyze_image(image: &RgbaImage) -> (f32, f32, f32) {
    let (width, height) = image.dimensions();
    let mut total_color_diff = 0.0;
    let mut edge_count = 0;
    let mut colorfulness = 0.0;

    for y in 0..height - 1 {
        for x in 0..width - 1 {
            let pixel = image.get_pixel(x, y);
            let right_pixel = image.get_pixel(x + 1, y);
            let bottom_pixel = image.get_pixel(x, y + 1);

            let color_diff_right = pixel.to_rgb().map2(&right_pixel.to_rgb(), |a, b| (a as i32 - b as i32).abs() as u8);
            let color_diff_bottom = pixel.to_rgb().map2(&bottom_pixel.to_rgb(), |a, b| (a as i32 - b as i32).abs() as u8);

            colorfulness += color_diff_right.channels().iter().map(|&x| f32::from(x)).sum::<f32>() / 3.0;
            colorfulness += color_diff_bottom.channels().iter().map(|&x| f32::from(x)).sum::<f32>() / 3.0;

            let edge_threshold = 30;
            if color_diff_right.to_luma().0[0] > edge_threshold {
                edge_count += 1;
            }
            if color_diff_bottom.to_luma().0[0] > edge_threshold {
                edge_count += 1;
            }

            total_color_diff += color_diff_right.to_luma().0[0] as f32;
            total_color_diff += color_diff_bottom.to_luma().0[0] as f32;
        }
    }

    let colorfulness = (colorfulness / ((width * height) as f32 * 2.0)).log10();
    let num_pixels = (width * height) as f32;
    let avg_color_diff = total_color_diff / (num_pixels * 2.0);
    let edge_density = edge_count as f32 / num_pixels;

    (avg_color_diff, edge_density, colorfulness)
}