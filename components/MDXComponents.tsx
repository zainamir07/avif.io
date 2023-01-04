import { ReactNode } from "react";
import Link from "@components/Link";
import Heading from "@components/Blog/Heading";
import Image from "@components/Blog/Image";
import Syntax from "@components/Blog/Syntax";
import Video from "@components/Blog/Video";
import Quote from "@components/Blog/Quote";

type ChildrenProps = { children: ReactNode };

function getHeading(level: number) {
  function HeadingWrapper({ children }: ChildrenProps) {
    return <Heading level={level} text={children as string} />;
  }
  HeadingWrapper.displayName = `Heading${level}`;
  return HeadingWrapper;
}

const MDXComponents = {
  Link,
  Image,
  Syntax,
  Video,
  code: Syntax,
  Quote,
  Heading,
  h1: getHeading(1),
  h2: getHeading(2),
  h3: getHeading(3),
  h4: getHeading(4),
  h5: getHeading(5),
  h6: getHeading(6),
};

export default MDXComponents;
