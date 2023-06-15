/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} input_data
* @param {ConversionOptions} options
* @returns {ConversionResult}
*/
export function convert_to_avif(input_data: Uint8Array, options: ConversionOptions): ConversionResult;
/**
* A special function for WebP.
* @param {Uint8Array} input_data
* @param {ConversionOptions} options
* @param {number} width
* @param {number} height
* @returns {ConversionResult}
*/
export function rgba_to_avif(input_data: Uint8Array, options: ConversionOptions, width: number, height: number): ConversionResult;
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
*/
  constructor(effort: number, quality: number, subsampling: number, keep_transparency: boolean);
/**
* Effort of conversion as a percentage from 0 to 100.
*/
  effort: number;
/**
*/
  keep_transparency: boolean;
/**
* Quality of conversion as a percentage from 0 to 100.
*/
  quality: number;
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
