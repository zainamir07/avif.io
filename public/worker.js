/* eslint-disable no-undef */
onmessage = async function (msg) {
  importScripts("/dist/conversion.js");

  const {
    convert_to_avif: convertToAvif,
    rgba_to_avif: rgbaToAvif,
    ConversionOptions,
    Subsampling,
    memory,
  } = await conversion.lib();

  console.log("const memory:", memory);
  console.log("const subsampling:", Subsampling);
  console.log("const conversionOptions:", ConversionOptions);
  console.log("const convertToAvif:", convertToAvif);
  console.log("const rgbatoavif:", rgbaToAvif);

  const result = convertInput();
  postResult(result);

  function convertInput() {
    const input = new Uint8Array(msg.data.input);
    const options = new ConversionOptions(
      msg.data.options.effort,
      msg.data.options.quality,
      msg.data.options.useYuv444 ? Subsampling.YUV444 : Subsampling.YUV420,
      msg.data.options.keepTransparency,
      msg.data.options.autoDownload
    );
    if (msg.data.isRawRgba) {
      return rgbaToAvif(
        input,
        options,
        msg.data.width,
        msg.data.height,
        postProgress
      );
    } else {
      return convertToAvif(input, options, postProgress);
    }
  }

  function postProgress(progress) {
    console.log("memory in postProgress", progress);
    postMessage(
      {
        type: "progress",
        progress,
      },
      []
    );
  }

  function postResult(result) {
    console.log("memory in postResult", result);
    if (result.error_size !== 0) {
      const errorData = new Uint8Array(
        memory.buffer,
        result.error,
        result.error_size
      );
      const error = new TextDecoder().decode(errorData);
      postMessage(
        {
          type: "error",
          error,
        },
        []
      );
    }

    const data = new Uint8Array(
      memory.buffer.slice(result.data, result.data + result.size)
    );
    postMessage(
      {
        type: "finished",
        data,
      },
      []
    );
  }
};
