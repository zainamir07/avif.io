let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}


const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}
/**
* @param {Uint8Array} input_data
* @param {ConversionOptions} options
* @returns {ConversionResult}
*/
export function convert_to_avif(input_data, options) {
    const ptr0 = passArray8ToWasm0(input_data, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    _assertClass(options, ConversionOptions);
    const ret = wasm.convert_to_avif(ptr0, len0, options.__wbg_ptr);
    return ConversionResult.__wrap(ret);
}

/**
* @param {Uint8Array} input_data
* @param {ConversionOptions} options
* @param {number} width
* @param {number} height
* @returns {ConversionResult}
*/
export function rgba_to_avif(input_data, options, width, height) {
    const ptr0 = passArray8ToWasm0(input_data, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    _assertClass(options, ConversionOptions);
    const ret = wasm.rgba_to_avif(ptr0, len0, options.__wbg_ptr, width, height);
    return ConversionResult.__wrap(ret);
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}
/**
*/
export const Subsampling = Object.freeze({ YUV420:0,"0":"YUV420",YUV444:1,"1":"YUV444",YUV400:2,"2":"YUV400", });
/**
*/
export const ResizeAlgorithm = Object.freeze({ Nearest:0,"0":"Nearest",Triangle:1,"1":"Triangle",CatmullRom:2,"2":"CatmullRom",Gaussian:3,"3":"Gaussian",Lanczos3:4,"4":"Lanczos3", });
/**
*/
export class ConversionOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ConversionOptions.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_conversionoptions_free(ptr);
    }
    /**
    * @returns {number}
    */
    get effort() {
        const ret = wasm.__wbg_get_conversionoptions_effort(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set effort(arg0) {
        wasm.__wbg_set_conversionoptions_effort(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get quality() {
        const ret = wasm.__wbg_get_conversionoptions_quality(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set quality(arg0) {
        wasm.__wbg_set_conversionoptions_quality(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get subsampling() {
        const ret = wasm.__wbg_get_conversionoptions_subsampling(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set subsampling(arg0) {
        wasm.__wbg_set_conversionoptions_subsampling(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {boolean}
    */
    get keep_transparency() {
        const ret = wasm.__wbg_get_conversionoptions_keep_transparency(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set keep_transparency(arg0) {
        wasm.__wbg_set_conversionoptions_keep_transparency(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {boolean}
    */
    get lossless() {
        const ret = wasm.__wbg_get_conversionoptions_lossless(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set lossless(arg0) {
        wasm.__wbg_set_conversionoptions_lossless(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {boolean}
    */
    get adaptive() {
        const ret = wasm.__wbg_get_conversionoptions_adaptive(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set adaptive(arg0) {
        wasm.__wbg_set_conversionoptions_adaptive(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {boolean}
    */
    get enable_palette_reduction() {
        const ret = wasm.__wbg_get_conversionoptions_enable_palette_reduction(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set enable_palette_reduction(arg0) {
        wasm.__wbg_set_conversionoptions_enable_palette_reduction(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number | undefined}
    */
    get palette_size() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_conversionoptions_palette_size(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return r0 === 0 ? undefined : r1 >>> 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number | undefined} arg0
    */
    set palette_size(arg0) {
        wasm.__wbg_set_conversionoptions_palette_size(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
    * @returns {boolean}
    */
    get enable_resize() {
        const ret = wasm.__wbg_get_conversionoptions_enable_resize(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set enable_resize(arg0) {
        wasm.__wbg_set_conversionoptions_enable_resize(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number | undefined}
    */
    get resize_width() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_conversionoptions_resize_width(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return r0 === 0 ? undefined : r1 >>> 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number | undefined} arg0
    */
    set resize_width(arg0) {
        wasm.__wbg_set_conversionoptions_resize_width(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
    * @returns {number | undefined}
    */
    get resize_height() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_conversionoptions_resize_height(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return r0 === 0 ? undefined : r1 >>> 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number | undefined} arg0
    */
    set resize_height(arg0) {
        wasm.__wbg_set_conversionoptions_resize_height(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
    * @returns {number}
    */
    get resize_algorithm() {
        const ret = wasm.__wbg_get_conversionoptions_resize_algorithm(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set resize_algorithm(arg0) {
        wasm.__wbg_set_conversionoptions_resize_algorithm(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {boolean}
    */
    get maintain_aspect_ratio() {
        const ret = wasm.__wbg_get_conversionoptions_maintain_aspect_ratio(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set maintain_aspect_ratio(arg0) {
        wasm.__wbg_set_conversionoptions_maintain_aspect_ratio(this.__wbg_ptr, arg0);
    }
    /**
    * @param {number} effort
    * @param {number} quality
    * @param {number} subsampling
    * @param {boolean} keep_transparency
    * @param {boolean} lossless
    * @param {boolean} adaptive
    * @param {boolean} enable_palette_reduction
    * @param {number | undefined} palette_size
    * @param {boolean} enable_resize
    * @param {number | undefined} resize_width
    * @param {number | undefined} resize_height
    * @param {number} resize_algorithm
    * @param {boolean} maintain_aspect_ratio
    */
    constructor(effort, quality, subsampling, keep_transparency, lossless, adaptive, enable_palette_reduction, palette_size, enable_resize, resize_width, resize_height, resize_algorithm, maintain_aspect_ratio) {
        const ret = wasm.conversionoptions_new(effort, quality, subsampling, keep_transparency, lossless, adaptive, enable_palette_reduction, !isLikeNone(palette_size), isLikeNone(palette_size) ? 0 : palette_size, enable_resize, !isLikeNone(resize_width), isLikeNone(resize_width) ? 0 : resize_width, !isLikeNone(resize_height), isLikeNone(resize_height) ? 0 : resize_height, resize_algorithm, maintain_aspect_ratio);
        return ConversionOptions.__wrap(ret);
    }
}
/**
*/
export class ConversionResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ConversionResult.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_conversionresult_free(ptr);
    }
    /**
    * @returns {number}
    */
    get data() {
        const ret = wasm.__wbg_get_conversionresult_data(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set data(arg0) {
        wasm.__wbg_set_conversionresult_data(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get size() {
        const ret = wasm.__wbg_get_conversionresult_size(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set size(arg0) {
        wasm.__wbg_set_conversionresult_size(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get error() {
        const ret = wasm.__wbg_get_conversionresult_error(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set error(arg0) {
        wasm.__wbg_set_conversionresult_error(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get error_size() {
        const ret = wasm.__wbg_get_conversionresult_error_size(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set error_size(arg0) {
        wasm.__wbg_set_conversionresult_error_size(this.__wbg_ptr, arg0);
    }
}

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

