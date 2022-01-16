export interface QuestionsProps {
  posts: string[];
}

const posts = [
  ["What is an AVIF file?", "/blog/faq/what-is-avif/"],
  ["What are the benefits of AVIF?", "/blog/faq/avif-benefits/"],
  ["What is the downside of AVIF?", "/blog/faq/avif-downsides/"],
  ["What is the goal of AVIF?", "/blog/faq/avif-goal/"],
  ["Why AVIF?", "/blog/faq/why-avif/"],
  ["What is AVIF used for?", "/blog/faq/avif-use/"],
  ["Who created AVIF?", "/blog/faq/avif-creator/"],
  ["How was AVIF created?", "/blog/faq/avif-creation/"],
  ["What is the technology stack behind AVIF?", "/blog/faq/avif-technologies/"],
  ["Is AVIF based on other formats?", "/blog/faq/avif-other-formats/"],
  ["Is AVIF open source?", "/blog/faq/avif-opensource/"],
  ["Does AVIF have patents?", "/blog/faq/avif-patents/"],
  ["What features does AVIF support?", "/blog/faq/avif-features/"],
  ["Is AVIF a lossless or lossy format?", "/blog/faq/avif-loss/"],
  ["Is AVIF lossless?", "/blog/faq/avif-lossless/"],
  ["Is AVIF lossy?", "/blog/faq/avif-lossy/"],
  ["Does AVIF support transparency?", "/blog/faq/avif-transparency/"],
  ["Does AVIF support animation?", "/blog/faq/avif-animation/"],
  ["Does AVIF support SDR?", "/blog/faq/avif-sdr/"],
  ["Does AVIF support HDR?", "/blog/faq/avif-hdr/"],
  [
    "What is the highest megapixel count for AVIF?",
    "/blog/faq/avif-megapixel/",
  ],
  ["Does AVIF support Wide Color Gamut?", "/blog/faq/avif-wcg/"],
  ["What color bit depth does AVIF support?", "/blog/faq/avif-bitdepth/"],
  ["What color space does AVIF support?", "/blog/faq/avif-colorspace/"],
  [
    "What chroma subsampling does AVIF support?",
    "/blog/faq/avif-chromasubsampling/",
  ],
  ["Does AVIF support film grain?", "/blog/faq/avif-filmgrain/"],
  ["Does AVIF support tiling?", "/blog/faq/avif-tiling/"],
  ["Does AVIF support layers?", "/blog/faq/avif-layers/"],
  ["How good is AVIF encoding speed?", "/blog/faq/avif-encoding/"],
  ["How good is AVIF decoding speed?", "/blog/faq/avif-decoding/"],
  [
    "Why is AVIF better than other compression codecs?",
    "/blog/faq/avif-better-codec/",
  ],
  ["Why is AVIF worse than other codecs?", "/blog/faq/avif-worse-codec/"],
  ["How do I convert AVIF to JPG?", "/blog/faq/avif-to-jpg/"],
  ["How do I convert AVIF to PNG?", "/blog/faq/avif-to-png/"],
];

export default function PostCloud() {
  const listQuestions = posts.map((source: any, index: any) => (
    <li
      key={index}
      className="inline-block px-1 mr-1 text-red-700 rounded-md text-tiny bg-red-1000"
    >
      <a target="_blank" rel="noreferrer" href={source[1]}>
        {source[0]}
      </a>
    </li>
  ));

  return (
    <>
      <h5 className="inline-block py-1 px-2 mt-4 mb-0 font-bold rounded-md">
        FAQ
      </h5>
      <ol>{listQuestions}</ol>
    </>
  );
}
