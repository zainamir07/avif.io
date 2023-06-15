"use strict";
(self.webpackChunkconversion = self.webpackChunkconversion || []).push([
  [292],
  {
    671: (_, t, e) => {
      let r;
      function n(_) {
        r = _;
      }
      e.d(t, {
        KT: () => b,
        Or: () => f,
        P1: () => a,
        T1: () => l,
        XF: () => u,
        oT: () => n,
        rG: () => w,
      }),
        (_ = e.hmd(_));
      let s = new (
        "undefined" == typeof TextDecoder
          ? (0, _.require)("util").TextDecoder
          : TextDecoder
      )("utf-8", { ignoreBOM: !0, fatal: !0 });
      s.decode();
      let o = null;
      function i() {
        return (
          (null !== o && 0 !== o.byteLength) ||
            (o = new Uint8Array(r.memory.buffer)),
          o
        );
      }
      let g = 0;
      function c(_, t) {
        const e = t(1 * _.length, 1) >>> 0;
        return i().set(_, e / 1), (g = _.length), e;
      }
      function p(_, t) {
        if (!(_ instanceof t))
          throw new Error(`expected instance of ${t.name}`);
        return _.ptr;
      }
      function w(_, t) {
        const e = c(_, r.__wbindgen_malloc),
          n = g;
        p(t, u);
        const s = r.convert_to_avif(e, n, t.__wbg_ptr);
        return l.__wrap(s);
      }
      function a(_, t, e, n) {
        const s = c(_, r.__wbindgen_malloc),
          o = g;
        p(t, u);
        const i = r.rgba_to_avif(s, o, t.__wbg_ptr, e, n);
        return l.__wrap(i);
      }
      const b = Object.freeze({
        YUV420: 0,
        0: "YUV420",
        YUV444: 1,
        1: "YUV444",
        YUV400: 2,
        2: "YUV400",
      });
      class u {
        static __wrap(_) {
          _ >>>= 0;
          const t = Object.create(u.prototype);
          return (t.__wbg_ptr = _), t;
        }
        __destroy_into_raw() {
          const _ = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), _;
        }
        free() {
          const _ = this.__destroy_into_raw();
          r.__wbg_conversionoptions_free(_);
        }
        get effort() {
          return r.__wbg_get_conversionoptions_effort(this.__wbg_ptr);
        }
        set effort(_) {
          r.__wbg_set_conversionoptions_effort(this.__wbg_ptr, _);
        }
        get quality() {
          return r.__wbg_get_conversionoptions_quality(this.__wbg_ptr);
        }
        set quality(_) {
          r.__wbg_set_conversionoptions_quality(this.__wbg_ptr, _);
        }
        get subsampling() {
          return (
            r.__wbg_get_conversionoptions_subsampling(this.__wbg_ptr) >>> 0
          );
        }
        set subsampling(_) {
          r.__wbg_set_conversionoptions_subsampling(this.__wbg_ptr, _);
        }
        get keep_transparency() {
          return (
            0 !==
            r.__wbg_get_conversionoptions_keep_transparency(this.__wbg_ptr)
          );
        }
        set keep_transparency(_) {
          r.__wbg_set_conversionoptions_keep_transparency(this.__wbg_ptr, _);
        }
        get adaptive() {
          return 0 !== r.__wbg_get_conversionoptions_adaptive(this.__wbg_ptr);
        }
        set adaptive(_) {
          r.__wbg_set_conversionoptions_adaptive(this.__wbg_ptr, _);
        }
        constructor(_, t, e, n, s) {
          const o = r.conversionoptions_new(_, t, e, n, s);
          return u.__wrap(o);
        }
      }
      class l {
        static __wrap(_) {
          _ >>>= 0;
          const t = Object.create(l.prototype);
          return (t.__wbg_ptr = _), t;
        }
        __destroy_into_raw() {
          const _ = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), _;
        }
        free() {
          const _ = this.__destroy_into_raw();
          r.__wbg_conversionresult_free(_);
        }
        get data() {
          return r.__wbg_get_conversionresult_data(this.__wbg_ptr);
        }
        set data(_) {
          r.__wbg_set_conversionresult_data(this.__wbg_ptr, _);
        }
        get size() {
          return r.__wbg_get_conversionresult_size(this.__wbg_ptr) >>> 0;
        }
        set size(_) {
          r.__wbg_set_conversionresult_size(this.__wbg_ptr, _);
        }
        get error() {
          return r.__wbg_get_conversionresult_error(this.__wbg_ptr);
        }
        set error(_) {
          r.__wbg_set_conversionresult_error(this.__wbg_ptr, _);
        }
        get error_size() {
          return r.__wbg_get_conversionresult_error_size(this.__wbg_ptr) >>> 0;
        }
        set error_size(_) {
          r.__wbg_set_conversionresult_error_size(this.__wbg_ptr, _);
        }
      }
      function f(_, t) {
        throw new Error(
          ((e = _), (r = t), (e >>>= 0), s.decode(i().subarray(e, e + r)))
        );
        var e, r;
      }
    },
    292: (_, t, e) => {
      var r = e(671);
      _.exports = e.v(t, _.id, "34a8a960cd05f52f3d4f", {
        "./conversion_bg.js": { __wbindgen_throw: r.Or },
      });
    },
  },
]);
