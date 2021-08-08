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
      postMeta={meta.avifVsHeif}
      posts={[meta.avifVsJpg, meta.avifVsPng, meta.avifVsGif]}
    >
      <ContentTable contentTable={contentTable} />
      <H level={2} callback={callback} text="Introduction" />
      The fight to replace JPEG as the main image format for web delivery is
      heating up. Its formats are derived from video codecs that are currently
      at the forefront of this battle. Introducing AVIF and HEIC: two image file
      formats vying it out for the web delivery crown.
      <br />
      AVIF, developed by the Alliance for Open Media in 2019, is an open
      <b> image file format based on the AV1 video codec. </b>
      HEIC (also known as HEIF) stands for High Efficiency Image Format, and it
      was released by the MPEG group in 2015 and is most known for its use on
      iOS. The HEIC format is derived from the HEVC (High Efficiency Video
      Coding) codec (also known as H.265 or MPEG-H Part 2)
      <br />
      Here's how the two competing image formats compare. Ultimately, we think
      AVIF will overtake JPEG and HEIF as the dominant image format for web
      delivery and more.
      <br />
      <H level={2} callback={callback} text="Quality and limits" />
      As both formats find their roots in video codecs, AVIF and HEIF share the
      resolution limitations of their respective standards. Both formats sport{" "}
      <b>maximum image dimensions of 8193 x 4320</b>
      .
      <br />
      Video professionals will recognize this as the size of an 8K video frame.
      It is possible to break this limit for both formats by independently
      encoded tiles of 8K frames. But this method introduces artifacts at the
      tile boundaries, affecting the overall appearance of images. Both formats
      are unsuitable for ultra-high-resolution photos.
      <br />
      <b>Both formats also have a maximum bit depth of 10. </b>
      Other competing file formats can reach bit depth (precision) of 12 or even
      24 bits. However, we find a 10-bit color to be precise enough for image
      delivery.
      <br />
      <b>
        HDR support is included with both HEIC and AVIF, supporting wide color
        gamuts like Rec. 709.{" "}
      </b>
      Both
      <b> HEIC and AVIF support a maximum of 5 channels</b>. AVIF can do 4:4:4
      in lossy compression, where HEIC relies entirely on chroma subsampling.
      <br />
      Barring support for 4:4:4, HEIC and AVIF have highly similar sets of
      limitations &ndash; and it isn't easy to separate them in this category.
      <br />
      <H level={2} callback={callback} text="Compression" />
      The main advantage of using image formats derived from video codecs is
      their excellent compression algorithm.
      <b>
        {" "}
        Both HEIC and AVIF perform excellently in high compressed scenarios.
      </b>
      <br />
      <b>AVIF functions well in low-fidelity situations</b>, where it can still
      retain high appeal while keeping file sizes down. High appeal images lack
      the compression artifacts that make a low-fidelity image look bad, like
      color banding and blockiness. This is one of JPEG's main disadvantages as
      highly compressed JPEG's lack appeal.
      <br />
      A lossless original PNG image can be converted to a 68.8kb JPEG image. In
      comparison, the same image in AVIF would have a file size of 67.6kb
      &ndash; with a much greater appeal (for example, more minor color
      banding).
      <br />
      <b>HEIC performs similarly to AVIF in low-fidelity scenarios. </b>
      The same lossless PNG bears a HEIC file of 69kb.
      <br />
      <b>AVIF pulls ahead in medium and high-fidelity scenarios. </b>
      We find that AVIF has the edge over its competitor with file size
      efficiency, where differences in appeal become less noticeable with
      increased fidelity.
      <br />
      <H level={2} callback={callback} text="Speed" />
      Decode speeds are essential for the responsiveness of websites. At the
      same time, encode rates are crucial for those dealing with large image
      workloads.
      <br />
      In general,
      <b> AVIF sports poor single-core encode speed and decode speeds. </b>
      HEIC sports a marginal improvement in single-core rates over AVIF, with
      encode speeds being slightly faster.
      <br />
      Where AVIF and HEIC can pull ahead of older formats like JPEG and PNG is
      with <b>parallelization. </b>This process allows the image coder to take
      advantage of multiple cores and threads to improve decoding and encoding
      speeds.
      <br />
      With computer hardware trending towards CPUs with higher core and thread
      counts, we anticipate that multi-core encode and decode speeds will be
      more critical in the coming years than single-core results.
      <br />
      <b>
        Overall, HEIC and AVIF are similarly slow with single-core speeds.
        Still, with excellent parallelization, multi-core machines won't see too
        much of a problem working with these formats.
      </b>
      <br />
      <H level={2} callback={callback} text="Other Features" />
      <b>Both AVIF and HEIC support animation</b>, and encoding animations using
      image formats derived from real video codecs will lead to a better result
      than using stills formats that support animation like aPNG and JPEG XL.
      <br />
      Moreover, both of these codecs support alpha transparency, which is
      another critical advantage over the aging JPEG format. The feature set
      similarities continue with overlay and depth map support.
      <br />
      <b>
        Both formats support overlays, which allow for independently encoded
        layers.{" "}
      </b>
      This makes it easy to add crisp text and graphics layers to a highly
      compressed photographic background.
      <b>
        {" "}
        Depth maps enable users to apply effects to the foreground and
        background.
      </b>
      <br />
      <b>Neither format supports progressive decoding</b>. This is a method used
      by formats like JPEG to accelerate page load times by displaying a
      low-resolution preview. At the same time, the rest of the image is being
      decoded. The lack of progressive decoding, paired with both AVIF and
      HEIC's poor decode speeds, may cause issues with underpowered machines.
      <br />
      <H level={2} callback={callback} text="Support" />
      One of the most notable uses of HEIC has been iOS, where iOS HEIC has
      become the default file format for photos taken with the iPhone's camera.
      However, despite this crucial corporation jumping in to support HEIC, the
      topic browser support is a tale of woe for HEIC.
      <br />
      <b>No major browser includes support for HEIC images</b>, not even Safari,
      a rather bizarre decision from Apple given its native support in macOS
      High Sierra and iOS 11+. If we hypothesized why browsers are so unwilling
      to support HEIC, we would put it down to the format not being
      royalty-free.
      <br />
      AVIF has a much broader level of browser support as an open and
      royalty-free format.
      <b> Google Chrome had fully supported AVIF images </b>
      since Chrome 85 back in Aug 2020 and Opera 76 also fully supports AVIF.
      <br />
      Users of Firefox can enable AVIF support from their browser config
      settings. However, Firefox has yet to include support for sequenced AVIF
      animations.
      <br />
      <b>Mobile support for AVIF is good too.</b> Android Browser, Chrome for
      Android, and Samsung Internet all fully support the standard.
      <br />
      <b>
        Safari and Microsoft Edge do not provide any support for AVIF as of yet.
      </b>
      <br />
      <H level={2} callback={callback} text="Summary" />
      HEIC and AVIF are remarkably similar formats on the spec sheet. They boast
      identical feature sets, supporting valuable features like
      <b> overlays, depth maps, </b>and
      <b> high bit depth support. </b>
      <br />
      These standards are two sides of the same coin. They both come from highly
      efficient and advanced video codecs, and both work well with animated
      images and adequate compression.
      <br />
      Aside from the slight advantage AVIF has over HEIC in file size efficacy
      and HEIC's slightly faster encode speed, it's
      <b> challenging to separate the two-image file formats.</b>
      <br />
      That is until we consider their market adoption. AVIF's royalty-free
      nature grants it a huge advantage in how willing browsers are to support
      it. AVIF carries a lot of momentum after Chrome included full support for
      the format. While browsers like Safari and Firefox are yet to support it
      fully, Firefox is very close, and we expect Safari to follow suit
      eventually.
      <br />
      HEIC doesn't currently have any momentum in browser support, with not even
      Apple (who use the format as their default image codec for iPhone photos)
      including support on Safari. We don't expect the situation to get any
      better for HEIC, and we have to hand the win over to AVIF.
      <br />
      <b>
        AVIF is a feature-rich and efficient image codec. We believe it has what
        it takes to become the dominant image format for web delivery and
        beyond.
      </b>
    </Blog>
  );
}
