let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}


const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

let WASM_VECTOR_LEN = 0;

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

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
* @param {Function} on_progress
* @returns {ConversionResult}
*/
export function convert_to_avif(input_data, options, on_progress) {
    const ptr0 = passArray8ToWasm0(input_data, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    _assertClass(options, ConversionOptions);
    const ret = wasm.convert_to_avif(ptr0, len0, options.__wbg_ptr, addHeapObject(on_progress));
    return ConversionResult.__wrap(ret);
}

/**
* A special function for WebP.
* @param {Uint8Array} input_data
* @param {ConversionOptions} options
* @param {number} width
* @param {number} height
* @param {Function} on_progress
* @returns {ConversionResult}
*/
export function rgba_to_avif(input_data, options, width, height, on_progress) {
    const ptr0 = passArray8ToWasm0(input_data, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    _assertClass(options, ConversionOptions);
    const ret = wasm.rgba_to_avif(ptr0, len0, options.__wbg_ptr, width, height, addHeapObject(on_progress));
    return ConversionResult.__wrap(ret);
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
/**
*/
export const Subsampling = Object.freeze({ YUV420:0,"0":"YUV420",YUV444:1,"1":"YUV444",YUV400:2,"2":"YUV400", });
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
    * Effort of conversion as a percentage from 0 to 100.
    * @returns {number}
    */
    get effort() {
        const ret = wasm.__wbg_get_conversionoptions_effort(this.__wbg_ptr);
        return ret;
    }
    /**
    * Effort of conversion as a percentage from 0 to 100.
    * @param {number} arg0
    */
    set effort(arg0) {
        wasm.__wbg_set_conversionoptions_effort(this.__wbg_ptr, arg0);
    }
    /**
    * Quality of conversion as a percentage from 0 to 100.
    * @returns {number}
    */
    get quality() {
        const ret = wasm.__wbg_get_conversionoptions_quality(this.__wbg_ptr);
        return ret;
    }
    /**
    * Quality of conversion as a percentage from 0 to 100.
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
    * @param {number} effort
    * @param {number} quality
    * @param {number} subsampling
    * @param {boolean} keep_transparency
    */
    constructor(effort, quality, subsampling, keep_transparency) {
        const ret = wasm.conversionoptions_new(effort, quality, subsampling, keep_transparency);
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

export function __wbindgen_number_new(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
};

export function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

export function __wbg_new_abda76e883ba8a5f() {
    const ret = new Error();
    return addHeapObject(ret);
};

export function __wbg_stack_658279fe44541cf6(arg0, arg1) {
    const ret = getObject(arg1).stack;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

export function __wbg_error_f851667af71bcfc6(arg0, arg1) {
    let deferred0_0;
    let deferred0_1;
    try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.error(getStringFromWasm0(arg0, arg1));
    } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
    }
};

export function __wbg_call_01734de55d61e11d() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
}, arguments) };

export function __wbindgen_debug_string(arg0, arg1) {
    const ret = debugString(getObject(arg1));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

