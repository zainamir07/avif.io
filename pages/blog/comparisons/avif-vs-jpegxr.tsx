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
      postMeta={meta.avifVsJpegxr}
      posts={[meta.avifVsJpg, meta.avifVsJpegxl, meta.avifVsJpeg2000]}
    >
      <ContentTable contentTable={contentTable} />
      <H level={2} callback={callback} text="Introduction" />
      After 28 years of being the most popular and most widely used image
      format, many image professionals predict that the end for the aging JPEG
      image file format is nigh.{" "}
      <b>
        There are several competitors in the battle to replace JPEG: In this
        article, we will talk about AVIF and JPEG XR (also known by its file
        extension JXR).
      </b>
      <br />
      JPEG XR was first developed in 2009 by the same Joint Photographic Experts
      Group that created the original 1992 JPEG format. It is based on
      Microsoft’s Windows Media Photo specifications (later renamed HD Photo)
      from 2006.
      <br />
      JPEG XR, standing for Extended Range, aims to solve some fundamental
      limitations and issues with JPEG while also improving the JPEG 2000 (JP2)
      format released by the same group in 2000.
      <br />
      AVIF was released in 2019 and is derived from the AV1 video codec. It was
      developed by the Alliance of Open Media (AOM). AVIF aims to bring the
      efficiency gains made by modern video codecs like AV1 and HVEC to the
      image world.
      <br />
      Here’s how these two emerging image file formats compare, and ultimately
      which you should use for image delivery.
      <H level={2} callback={callback} text="Limits and Quality" />
      AVIF is derived from a video codec. Therefore, many video professionals
      will recognize some of its limitations.{" "}
      <b>
        AVIF has a maximum resolution of 8193 x 4320 pixels, roughly the size of
        an 8K video frame.
      </b>
      <br />
      It is possible to produce larger AVIF images by independently encoding
      tiles and tiling them to create a larger image. However, using this method
      introduces some artifacts at the borders of these individual frames. This
      format is therefore unsuitable for pictures with large dimensions.
      <br />
      JPEG XR follows the improvements JPEG 2000 made in its maximum image
      dimensions,{" "}
      <b>boasting a max resolution of 4,294,967,295 x 4,294,967,295 pixels.</b>
      <br />
      Both AVIF and JPEG XR support wide color gamuts and HDR images. JPEG XR
      supports a max bit depth of 32-bits (or deep color), whereas AVIF has a
      max precision of 10-bits. This may seem like a significant distance, but
      we have found that 10-bit precision is usually good enough for image
      delivery. Only those with authoring workflows can generally benefit from
      higher bit depths. Both formats can also do 4:4:4.
      <H level={2} callback={callback} text="Compression" />
      JPEG XR was released to improve upon the compression ratios of both JPEG
      and JPEG 2000. JPEG XR uses a similar compression algorithm to JPEG but
      offers smaller file sizes and better quality. JXR supports both lossy and
      lossless compressions.
      <br />
      <b>
        With low-fidelity, highly compressed photos, AVIF outshines most of its
        competition.
      </b>{" "}
      It provides some excellent file size efficiency when compared to JPEG and
      retains a high level of appeal. The appeal is how good a photo looks and
      can be measured by the absence of compression artifacts like nasty color
      banding or blockiness.
      <br />
      JPEG XR’s file sizes are generally similar to AVIF files. However, the
      newer file format retains more detail and appeal. AVIF images can
      therefore be smaller and still match the quality of JPEG XR.
      <br />
      AVIF also pulls ahead JPEG XR with its more modern compression engine with
      lossless compression, leading to smaller file sizes.
      <H level={2} callback={callback} text="Speed" />
      JPEG XR is renowned for its low computational and memory resource
      requirements. Therefore JXR encodes and decodes speeds are generally quite
      fast on even underpowered hardware.
      <br />
      AVIF, on the other hand, suffers from less-than-ideal speeds due to its
      relative complexity. Encode and decode speeds are slow, and therefore
      underpowered machines may struggle to handle AVIF files.
      <br />
      Both formats do, however, support parallelization. This method of
      processing an encode or decode workload allows an image coder to take
      advantage of multi-threaded hardware and utilize more than one CPU core.
      <br />
      AVIF is generally more parallelizable than JPEG XR. Therefore we expect
      the gulf between AVIF and JXR’s speeds to shrink as computer hardware
      tends towards higher core counts.
      <H level={2} callback={callback} text="Other Features" />
      <b>
        Both AVIF and JPEG XR support alpha transparency, unlike JPEG, making it
        more suitable with graphics and text images.
      </b>{" "}
      AVIF also includes support for animations. This is a task it succeeds in
      due to its relation to the AV1 video codec.
      <br />
      JPEG XR doesn’t support animated images, although the Motion JPEG XR
      standard was released in March 2010 as a separate format for videos and
      animations.
      <br />
      AVIF supports overlays and depth maps. Overlays allow for layers to help
      maintain the clarity of text and graphics over highly compressed photo
      backgrounds. Depth maps enable effects to be added to foregrounds and
      backgrounds. <b>JPEG XR doesn’t support these features.</b>
      <br />
      <b>
        We’re particularly impressed by JPEG XR’s progressive resolution
        refinement feature
      </b>
      , allowing for the use of embedded thumbnail images and low-resolution
      preview images while an image is being decoded.
      <br />
      <b>AVIF, overall, has a more extensive feature set.</b> However, with
      support for alpha transparency and HDR support, JXR marks a vast
      improvement over JPEG.
      <H level={2} callback={callback} text="Support" />
      Since its release in 2009, JPEG XR has suffered from low uptake and
      insufficient momentum throughout its lifetime. As the spiritual successor
      to the Windows Media Photo file format, JPEG XR was supported by Internet
      Explorer upon the release of IE9 in 2011. This support followed through to
      IE11 and eventually the initial release of Microsoft Edge. However,
      support for JXR was dropped when Microsoft released the Chromium version
      of Edge in 2020.
      <br />
      <b>In 2021, no major web browser supports JPEG XR.</b>
      <br />
      The story is thankfully different for AVIF. Despite its youth, AVIF has
      enjoyed an impressive rise in market uptake and has been fully supported
      by the world’s most popular browser Google Chrome since version 93. Opera
      also fully supports AVIF.
      <br />
      In July 2021, Firefox included full support for AVIF images both still and
      sequenced in their Firefox 92 update. Safari and Microsoft Edge are yet to
      support the format, but we expect them to follow suit soon.
      <br />
      The future is looking bright for AVIF’s browser support. JPEG XR never
      enjoyed any browser success outside of Internet Explorer and the initial
      builds of Edge, and now it has been replaced by JPEG XL. It’s hard to see
      this situation improving for JXR in any way.
      <H level={2} callback={callback} text="Conclusion for Nerds" />
      JPEG XR was an impressive step-up from JPEG and was the Joint Photographic
      Experts Group’s second attempt at replacing their original hit standard
      after the failed attempt with JPEG 2000.
      <br />
      Although it offered some great leaps in compression performance and
      features like alpha transparency, browsers were unwilling to support the
      format. Unfortunately, it has faded into obscurity.
      <br />
      Fifteen years later and the search for a JPEG replacement continues. AVIF
      is an overall more modern and feature-rich format than JPEG XR. It even
      beats out newer standards like JPEG XL in compression ratios and uptake on
      several occasions.
      <br />
      AVIF also has the momentum to demand support from major browsers. The
      recent full support from Firefox is an excellent indicator that AVIF’s
      browser arsenal can continue to grow – and we expect AVIF will become the
      following dominant image format for all purposes.
      <H level={2} callback={callback} text="Conclusion for Marketeers" />
      Most people wouldn’t have heard of JPEG XR before, and for a good reason.
      JPEG XR has, over its 15-year existence, failed to capture the hearts of
      photo professionals and therefore has seen minimal use over the years.
      <br />
      With no major browser supporting the standard, we doubt this will ever
      change for JPEG XR.
      <br />
      The average user instead will benefit from AVIF’s greater file size
      efficiency, compression quality ratios, and wide-reaching features.
      <br />
      AVIF is a powerful image file format. We think its low-fidelity
      high-appeal performance will make it a popular and valuable format for web
      images. Users should be glad to see away entirely obsolete formats like
      GIF for animated images and enjoy the excellent quality of highly
      compressed AVIF images and animations.
      <br />
      Simply put,{" "}
      <b>
        AVIF is ideally placed to become the standard image format for image
        delivery.
      </b>
    </Blog>
  );
}
