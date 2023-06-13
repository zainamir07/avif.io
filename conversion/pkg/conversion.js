import * as wasm from "./conversion_bg.wasm";
import { __wbg_set_wasm } from "./conversion_bg.js";
__wbg_set_wasm(wasm);
export * from "./conversion_bg.js";
