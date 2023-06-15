// Import necessary modules and libraries
use std::env;
use std::fs;
use std::io::{Read, Write};

use rav1e;

use conversion;

// Main function
fn main() {
    // Set the progress function for rav1e to output percentages
    unsafe {
        rav1e::ON_PROGRESS = Some(Box::new(|progress| {
            println!("{}%", (progress * 100.0) as u32)
        }));
    }

    // Get command-line arguments
    let args: Vec<_> = env::args().collect();
    // Read input image file to a byte vector
    let mut input = Vec::new();
    fs::File::open(&args[1])
        .unwrap()
        .read_to_end(&mut input)
        .unwrap();
    let input = input;
    // Parse the transparency flag from command-line argument
    let keep_transparency = args[3].parse().unwrap();

    // Set the progress scale if keeping transparency
    if keep_transparency {
        unsafe {
            rav1e::PROGRESS_SCALE = 0.5;
        }
    }

    // Convert image to AVIF format
    let result = conversion::convert_to_avif(
        &input,
        &conversion::ConversionOptions {
            effort: 0,
            quality: args[2].parse().unwrap(),
            subsampling: conversion::Subsampling::YUV420,
            keep_transparency,
        },
    )
    .unwrap();

    // Create output file with the ".avif" extension
    let mut output_file = fs::File::create(args[1].clone() + ".avif").unwrap();
    // Write the result (converted image) to the output file
    output_file.write_all(&result).unwrap();
}
