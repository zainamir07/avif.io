import NextLink from "next/link";

interface Props {
  href: string;
  text?: string;
  className?: string;
  children?: any;
}

export default function Link(props: Props) {
  const { href, text, className, children } = props;
  const isInternalOrPrefix =
    href &&
    (href.startsWith("/") ||
      href.startsWith("#") ||
      href.startsWith("https://"));

  return (
    <NextLink
      href={isInternalOrPrefix ? href : `https://${href}`}
      title={text}
      rel={isInternalOrPrefix ? "prefetch" : "noopener noreferrer"}
      target={isInternalOrPrefix ? "_self" : "_blank"}
      className={className}
      tabIndex={0}
    >
      {text}
      {children}
    </NextLink>
  );
}
