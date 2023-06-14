/* eslint-disable no-undef */
const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: path.join(__dirname, "glue.js"),
  target: "webworker",
  experiments: {
    syncWebAssembly: true,
    asyncWebAssembly: true,
  },
  output: {
    library: "conversion",
    path: path.join(__dirname, "..", "public", "dist"),
    publicPath: "/dist/",
    filename: "conversion.js",
    globalObject: "self",
  },
};
