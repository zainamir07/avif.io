import React, { useCallback, useMemo, useState } from "react";

interface ImgProps {
  alt?: string;
  src: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  fill?: boolean;
}

const sizes = [768, 384];
const formats = [
  ["image/avif", "avif"],
  ["image/webp", "webp"],
];

export default function Img(props: ImgProps) {
  const [isLoading, setLoading] = useState(true);

  const { alt, src, className, imgClassName, priority, onError, onClick } =
    props;

  // Generate an alternative text for the image based on its source
  const altText = useMemo(
    () => alt ?? src.replace(/-|\/|\.(webp|jpg|png|avif|svg)/g, " "),
    [alt, src]
  );

  // Generate the className for the Image component
  const generateClassName = useMemo(() => {
    return `text-center ${
      className?.includes("w-") ? className : "w-full " + className
    } ${imgClassName} ${
      isLoading ? "grayscale blur-xl" : "grayscale-0 blur-0"
    } object-contain duration-200 ease-in-out`;
  }, [className, imgClassName, isLoading]);

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
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        width={2880}
        height={1620}
        src={`/img/${src}-768.webp`}
        alt={altText}
        title={alt}
        className={generateClassName}
        onError={onError}
        onClick={onClick}
        onLoad={() => setLoading(false)}
      />
    </picture>
  );
}
