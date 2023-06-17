/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} input_data
* @param {ConversionOptions} options
* @returns {ConversionResult}
*/
export function convert_to_avif(input_data: Uint8Array, options: ConversionOptions): ConversionResult;
/**
* @param {Uint8Array} input_data
* @param {ConversionOptions} options
* @param {number} width
* @param {number} height
* @returns {ConversionResult}
*/
export function rgba_to_avif(input_data: Uint8Array, options: ConversionOptions, width: number, height: number): ConversionResult;
/**
*/
export enum ResizeAlgorithm {
  Nearest = 0,
  Triangle = 1,
  CatmullRom = 2,
  Gaussian = 3,
  Lanczos3 = 4,
}
/**
*/
export enum Subsampling {
  YUV420 = 0,
  YUV444 = 1,
  YUV400 = 2,
}
/**
*/
export class ConversionOptions {
  free(): void;
/**
* @param {number} effort
* @param {number} quality
* @param {number} subsampling
* @param {boolean} keep_transparency
* @param {boolean} adaptive
* @param {boolean} enable_resize
* @param {number | undefined} resize_width
* @param {number | undefined} resize_height
* @param {number} resize_algorithm
* @param {boolean} maintain_aspect_ratio
*/
  constructor(effort: number, quality: number, subsampling: number, keep_transparency: boolean, adaptive: boolean, enable_resize: boolean, resize_width: number | undefined, resize_height: number | undefined, resize_algorithm: number, maintain_aspect_ratio: boolean);
/**
*/
  adaptive: boolean;
/**
*/
  effort: number;
/**
*/
  enable_resize: boolean;
/**
*/
  keep_transparency: boolean;
/**
*/
  maintain_aspect_ratio: boolean;
/**
*/
  quality: number;
/**
*/
  resize_algorithm: number;
/**
*/
  resize_height?: number;
/**
*/
  resize_width?: number;
/**
*/
  subsampling: number;
}
/**
*/
export class ConversionResult {
  free(): void;
/**
*/
  data: number;
/**
*/
  error: number;
/**
*/
  error_size: number;
/**
*/
  size: number;
}
