const sizes = [768, 384];
const formats = [
  ["image/avif", "avif"],
  ["image/webp", "webp"],
];

const Image = ({ alt, src }: { alt: string; src: string }) => {
  const sources = formats.map((format) => (
    <source
      key={format[1]}
      sizes="(max-width: 768px) 100vw, 768px"
      srcSet={`/img/${src}-${sizes[0]}.${format[1]} ${sizes[0]}w, /img/${src}-${sizes[1]}.${format[1]} ${sizes[1]}w`}
      type={`${format[0]}`}
    />
  ));

  return (
    <picture className="overflow-hidden rounded-md">
      {sources}
      <img
        loading="lazy"
        decoding="async"
        width={2880}
        height={1620}
        src={`/img/${src}-768.webp`}
        alt={alt}
        title={alt}
      />
    </picture>
  );
};

export default Image;
