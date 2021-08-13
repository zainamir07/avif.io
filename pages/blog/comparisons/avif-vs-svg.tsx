import ContentTable, { ContentTableEntry } from "@components/Blog/ContentTable";
import H from "@components/Blog/H";
import meta from "@lib/meta.json";
import Blog from "@components/Blog";
import { useState } from "react";

export default function BlogPost() {
  const [contentTable, setContentTable] = useState<ContentTableEntry[]>([]);

  function callback(entry: ContentTableEntry) {
    contentTable.push(entry);
    setContentTable([...contentTable]);
  }

  return (
    <Blog
      postMeta={meta.avifVsSvg}
      posts={[meta.avifVsWebp, meta.avifVsWebp2, meta.avifVsGif]}
    >
      <ContentTable contentTable={contentTable} />
      <H level={2} callback={callback} text="Introduction" />
      There are few formats you can use for those looking to encode graphic
      images like logos, text, and illustrations. These formats fall into one of
      two camps: bitmap and vector formats.
      <br />
      Bitmap graphics, sometimes known as raster graphics, essentially means an
      image comprises a grid of pixels known as a dot matrix.{" "}
      <b>One of the leading raster graphics formats is AVIF.</b> AVIF was
      released in 2019 by the Alliance for Open Media (AOM) and aimed to replace
      other lossless and lossy formats used for graphics like PNG and GIF.
      <br />
      In the other camp, we have vector graphics formats.{" "}
      <b>With vector graphics, images are saved as mathematical equations</b> on
      a cartesian plane – instead of the grid matrix method used for raster
      graphics. A vector image tells the computer which lines to draw to view
      this image. The most popular vector graphics format is SVG (scalable
      vector graphics).
      <br />
      Here's how these formats compare and which you should use for the delivery
      of your graphics.
      <H level={2} callback={callback} text="Limits and Quality" />
      AVIF is based on the AV1 video codec, a highly efficient format for video
      released in 2017. Those who work with video will therefore recognize some
      of these key limitations from common video codecs. AVIF has a maximum
      resolution of 65536 x 65536 pixels. This limit is acceptable for most
      photos.
      <br />
      The limitations of SVG work a bit differently from the raster AVIF format.
      Instead of having a set number of pixels SVG can support, vector graphics
      like SVG consist of lines and points.
      <br />
      These images lack detail as it's hard to represent complex patterns and
      shapes mathematically. This means
      <b>
        it's challenging to define photo or photo-like graphics in a vector
        image
      </b>
      . In general, the more complex a picture is, the harder it is to represent
      (known as tracing) it as a vector graphic – and it's nearly impossible to
      trace a photo.
      <br />
      AVIF, as a photo format also, supports features like wide color gamuts and
      HDR images. These are great for sharing detailed pictures but aren't too
      useful for graphic content. Colors in SVG are limited to the sRGB color
      space.
      <br />
      <b>The main advantage of SVG is its scalability.</b> When you enlarge a
      bitmap image like an AVIF file, the perceived resolution of the image
      drops as you zoom closer into that grid. An image, therefore, begins to
      become blurry. If you zoom in enough, you will be able to see the
      individual pixels. This is not the case with vector graphics. When an SVG
      image is enlarged, there is no loss in quality or detail. As they are
      resolution-independent, vector graphics are infinitely scalable.
      <H level={2} callback={callback} text="Compression" />
      <b>
        It is most beneficial to compare AVIF's lossless compression with SVG
      </b>{" "}
      as it's a high-resolution lossless image is the closest a bitmap format
      will get to vector graphics. AVIF's lossless compression beats out formats
      like PNG to provide smaller file sizes with identical quality.
      <br />
      Before the introduction of AVIF, the industry standard for bitmap graphics
      was PNG (Portable Network Graphics).
      <br />
      It is possible to reduce the size of SVG images. As an XML-based format,
      <b>
        SVG files tend to contain many repeated fragments of text baked into the
        file.
      </b>{" "}
      This lends itself well to lossless compression. Using the gzip algorithm,
      these fragments can be removed, cutting the size of the file by up to 50%.
      The same 82.3kB SVG graphic can be optimized to be ~30kB.
      <br />
      AVIF also supports lossy compression, and it is one of the format's key
      strengths. Lossy formats like JPEG were previously unsuitable for graphics
      because lossy compression blurs edges and introduces compression
      artifacts.
      <br />
      This is because JPEG's lossy compressions struggle to approximate the
      sharp lines of graphic images. AVIF's lossy compression has excellent
      appeal, meaning fewer artifacts exist, and it does a better job matching a
      graphic image to reduce its file size. Using AVIF, users can decimate a
      graphic's file size without damaging its visual quality too much.
      <br />
      By design, vector graphics can't be compressed using lossy methods.
      <H level={2} callback={callback} text="Speed" />
      <b>
        When decoding SVG images, a computer does not have to process an entire
        pixel grid and only draws lines.
      </b>{" "}
      Therefore, it is swift to encode and decode SVG files, and many web admins
      use SVG graphics over PNG (and now AVIF) to improve page load times.
      <br />
      By comparison, AVIF is a slower format to use, thanks to its complexity.
      The format boasts mediocre single-core encode and decode speeds. AVIF
      does, however, support parallelization. This allows the image coder to
      take advantage of multi-threaded hardware and utilize more than one CPU
      core to decode and encode AVIF images. As computer hardware tends towards
      higher core and thread counts, we expect AVIF's slow speeds to improve
      over time.
      <br />
      It is clear, however, that for most images, SVG will always be faster than
      AVIF.
      <H level={2} callback={callback} text="Other Features" />
      <b>
        Both AVIF and SVG support alpha transparency, a feature that is vital
        for graphics with transparent backgrounds.
      </b>
      <br />
      AVIF supports overlays and depth maps. Overlays allow for layers to help
      maintain the clarity of text and graphics over highly compressed photo
      backgrounds. Depth maps enable effects to be added to foregrounds and
      backgrounds. These features don't apply to vector graphics.
      <br />
      Moreover, <b>both formats also support animation.</b> This is a feature
      that is great for animated graphics and cartoons. As AVIF is based on the
      AV1 video standard, sequenced AVIF images can benefit from the interframe
      compression that powers high-efficiency motion picture codecs. AVIF is
      perfect for animated photos like camera video but can also be great for
      some motion graphics.
      <br />
      Animated vectors can be achieved through a few methods, scripting,
      styling, and SMIL. Scripting SVGs for animation works great to animate
      user interfaces like buttons and panels. SVGs can be animated using
      CSS-style tags for basic keyframing. To match the same level of complexity
      as sequenced AVIFs, the Synchronized Multimedia Integration Language can
      be used for multimedia presentations using SVG.
      <br />
      Using SMIL, these animations can be interactive and can respond to events
      like mouse clicks. Check out this nifty missile game demo created using
      SMIL:
      <br />
      https://upload.wikimedia.org/wikipedia/commons/9/9b/SMIL_missile_demo.svg
      (this is licensed with the This file is licensed under the Creative
      Commons Attribution 2.5 Generic license. A simple video game by CMG Lee
      demonstrating the capabilities of SMIL for interactivity.)
      <H level={2} callback={callback} text="Support" />
      <b>
        As the primary format for vector graphics, SVG is supported by all major
        web browsers on mobile and desktop.
      </b>{" "}
      All major browsers now also support animated SVG images and the SMIL
      language. SVG is an integral part of web development, and its universal
      support is no surprise.
      <br />
      Despite its youth,{" "}
      <b>
        AVIF has enjoyed an impressive rise in market uptake and has been fully
        supported by the world's most popular browser Google Chrome since
        version 93.
      </b>{" "}
      Opera also fully supports AVIF.
      <br />
      In July 2021, Firefox included full support for AVIF images both still and
      sequenced in their Firefox 92 update. Safari and Microsoft Edge are yet to
      support the format, but we expect them to follow suit soon.
      <H level={2} callback={callback} text="Conclusion for Nerds" />
      <b>
        SVG and AVIF are entirely different methods of storing images and have
        their various strengths and weaknesses.
      </b>{" "}
      To decide which format to use, you must identify the complexity of the
      image you're hoping to export. The more detailed an image is, the harder
      it is to trace that as a vector graphic. You cannot represent photos as
      SVGs, and even photo-like pictures will struggle to be traced as a vector.
      <br />
      AVIF stands as a significant forward step for raster graphics. Before
      AVIF, PNG files were massive compared to optimized SVG graphics. Therefore
      those looking to reduce bandwidth limitations and page loads used SVG
      graphics. The story has now changed with AVIF due to its much more
      efficient lossless compression. For complex graphics, AVIF is unbeatable.
      <br />
      But for simple graphics like logos and text art, SVG is a hard image
      format to beat. Raster graphics are usually easier to share as they are
      supported by more image previewers, social media apps, etc. However, SVG's
      transformation support makes it perfect for website interfaces.
      <H level={2} callback={callback} text="Conclusion for Marketeers" />
      <b>
        With the vast majority of images available being raster graphics, AVIF
        is a format that will be more useful for the broader public as we
        advance.
      </b>
      For the average user, bitmap images are easier to handle, download and
      view.
      <br />
      There are exceptions where SVG files are more convenient, like embedded
      graphics on a web page. Still, overall, the improved file size efficiency
      of AVIF will be able to transform the graphics industry more than SVG use.
      The improvements in lossy compression AVIF make graphic images smaller and
      easier to transfer and view.
      <br />
      <b>
        While SVG currently has more comprehensive browser support, we expect
        AVIF to catch up in the coming years
      </b>
      , as we expect Edge and Safari to finally include support for the format
      soon. AVIF is an excellent all-purpose format for use both with graphical
      content and photo images. We expect it to become the one-size-fits-all
      image format for the future.
    </Blog>
  );
}
