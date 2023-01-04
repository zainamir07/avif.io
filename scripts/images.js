/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const output = "../public/img/";
const input = "../images/";

const createDirectoryIfNotExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const webpQuality = { quality: 64, reductionEffort: 0 };
const avifQuality = { quality: 51, effort: 0, chromaSubsampling: "4:2:0" };
const sizes = [768, 384];

createDirectoryIfNotExists(output);

fs.readdir(input, (err, files) => {
  console.log(`✅ Found ${files.length} image. Converting now..`);
  files.forEach((file) => {
    const fileShort = path.parse(file).name;
    const convert = (size) => {
      sharp(input + file)
        .webp(webpQuality)
        .resize({ width: size })
        .toFile(`${output}${fileShort}-${size}.webp`);
      sharp(input + file)
        .avif(avifQuality)
        .resize({ width: size })
        .toFile(`${output}${fileShort}-${size}.avif`);
    };
    sizes.forEach(convert);
  });
});
