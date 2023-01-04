import NextLink from "next/link";

interface Props {
  href: string;
  text?: string;
  className?: string;
  children?: any;
}

export default function Link(props: Props) {
  const { href, text, className, children } = props;
  const isInternal = href && (href.startsWith("/") || href.startsWith("#"));

  return (
    <NextLink
      href={isInternal ? href : `https://${href}`}
      title={text}
      rel={isInternal ? "prefetch" : "noopener noreferrer"}
      target={isInternal ? "_self" : "_blank"}
      className={className}
      tabIndex={0}
    >
      {text}
      {children}
    </NextLink>
  );
}
