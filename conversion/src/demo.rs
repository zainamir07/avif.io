use std::env;
use std::fs;
use std::io::{Read, Write};

use rav1e;

use conversion;

fn main() {
    unsafe {
        rav1e::ON_PROGRESS = Some(Box::new(|progress| {
            println!("{}%", (progress * 100.0) as u32)
        }));
    }

    let args: Vec<_> = env::args().collect();
    let mut input = Vec::new();
    fs::File::open(&args[1])
        .unwrap()
        .read_to_end(&mut input)
        .unwrap();
    let input = input;
    let keep_transparency = args[3].parse().unwrap();

    if keep_transparency {
        unsafe {
            rav1e::PROGRESS_SCALE = 0.5;
        }
    }

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
    let mut output_file = fs::File::create(args[1].clone() + ".avif").unwrap();
    output_file.write_all(&result).unwrap();
}
