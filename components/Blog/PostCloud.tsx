export interface QuestionsProps {
  posts: string[];
}

const posts = [
  ["What is an AVIF file?", "/faq/what-is-avif/"],
  ["What are the benefits of AVIF?", "/faq/avif-benefits/"],
  ["What is the downside of AVIF?", "/faq/avif-downsides/"],
  ["What is the goal of AVIF?", "/faq/avif-goal/"],
  ["Why AVIF?", "/faq/why-avif/"],
  ["What is AVIF used for?", "/faq/avif-use/"],
  ["Who created AVIF?", "/faq/avif-creator/"],
  ["How was AVIF created?", "/faq/avif-creation/"],
  ["What is the technology stack behind AVIF?", "/faq/avif-technologies/"],
  ["Is AVIF based on other formats?", "/faq/avif-other-formats/"],
  ["Is AVIF open source?", "/faq/avif-opensource/"],
  ["Does AVIF have patents?", "/faq/avif-patents/"],
  ["What features does AVIF support?", "/faq/avif-features/"],
  ["Is AVIF a lossless or lossy format?", "/faq/avif-loss/"],
  ["Is AVIF lossless?", "/faq/avif-lossless/"],
  ["Is AVIF lossy?", "/faq/avif-lossy/"],
  ["Does AVIF support transparency?", "/faq/avif-transparency/"],
  ["Does AVIF support animation?", "/faq/avif-animation/"],
  ["Does AVIF support SDR?", "/faq/avif-sdr/"],
  ["Does AVIF support HDR?", "/faq/avif-hdr/"],
  ["What is the highest megapixel count for AVIF?", "/faq/avif-megapixel/"],
  ["Does AVIF support Wide Color Gamut?", "/faq/avif-wcg/"],
  ["What color bit depth does AVIF support?", "/faq/avif-bitdepth/"],
  ["What color space does AVIF support?", "/faq/avif-colorspace/"],
  [
    "What chroma subsampling does AVIF support?",
    "/faq/avif-chromasubsampling/",
  ],
  ["Does AVIF support film grain?", "/faq/avif-filmgrain/"],
  ["Does AVIF support tiling?", "/faq/avif-tiling/"],
  ["Does AVIF support layers?", "/faq/avif-layers/"],
  ["How good is AVIF encoding speed?", "/faq/avif-encoding/"],
  ["How good is AVIF decoding speed?", "/faq/avif-decoding/"],
  [
    "Why is AVIF better than other compression codecs?",
    "/faq/avif-better-codec/",
  ],
  ["Why is AVIF worse than other codecs?", "/faq/avif-worse-codec/"],
  ["How do I convert AVIF to JPG?", "/faq/avif-to-jpg/"],
  ["How do I convert AVIF to PNG?", "/faq/avif-to-png/"],
];

export default function Questions() {
  const listQuestions = posts.map((source: any, index: any) => (
    <li
      key={index}
      className="inline-block p-1 m-1 text-red-700 rounded-md text-tiny bg-red-1000"
    >
      <a target="_blank" rel="noreferrer" href={source[1]}>
        {source[0]}
      </a>
    </li>
  ));

  return (
    <>
      <h5 className="inline-block py-1 px-3 mt-6 font-bold rounded-md">FAQ</h5>
      <ol>{listQuestions}</ol>
    </>
  );
}
