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
      postMeta={meta.avifVsJpeg2000}
      posts={[meta.avifVsJpg, meta.avifVsJpegxl, meta.avifVsWebp]}
    >
      <ContentTable contentTable={contentTable} />
      <H level={2} callback={callback} text="Introduction" />
      Two key competitors have broken out from the pack to fight for image
      format dominancy in the battle to replace the aging JPEG standard. In one
      corner, we have the spiritual successor JPEG 2000, and in the other, we
      have the relatively new AVIF standard.
      <br />
      <b>JPEG 2000 was developed between 1997 and 2000</b> and released at the
      turn of the millennium by the
      <b> same Joint Photographic Experts Group committee </b>
      that developed the <b>original 1992 JPEG file format</b>. Designed to
      solve some of the limitations of the aging format and replace its older
      brother, JPEG 2000 struggled with market adoption, and 21 years on, the
      JP2 file format has little use on the web.
      <br />
      <b>AVIF,</b> developed by the Alliance for Open Media in 2019, is an open
      and royalty-free
      <b> image file format derived from the AV1 video codec.</b>
      Despite its relatively young age as a released format, it has seen some
      impressive market adoption &ndash; most notably with Netflix transitioning
      to AVIF for their promotional images thanks to its overlay support.
      <br />
      Here's how the two standards stack up against each other, and ultimately
      which is more likely to dethrone JPEG as the dominant image format.
      <br />
      <H level={2} callback={callback} text="Quality and limits" />
      As a format that finds its roots in frames of AV1 video, AVIF
      <b> has an image resolution limitof 65536 x 65536 pixels</b>. Still, there
      tend to be artifacts at the tile boundaries of 8K frames if you use this
      method. This makes large-resolution AVIF images generally undesirable.
      <br />
      This issue is not present in
      <b>
        {" "}
        JPEG 2000, with theoretical maximum image dimensions of 4,294,967,296 x
        4,294,967,296.
      </b>
      <br />
      JPEG 2000 also pulls ahead in precision or more commonly known as max bit
      depth.
      <b> JPEG 2000 supports a bit depth of up to 38 bits</b>, as compared to{" "}
      <b>AVIF 12-bit limits.</b> This may seem like a dramatic jump, but 10-bit
      precision is usually good enough for images in practice.
      <br />
      Both{" "}
      <b>
        AVIF and JPEG 2000 supports 4:4:4, wide gamut support with HDR images
        and in standard dynamic range with Rec 709.
      </b>
      <br />
      In most aspects, JPEG 2000 pulls ahead of AVIF when it comes to its
      limitations. However, this broad support for data limits comes at a cost
      we'll cover later on.
      <br />
      <H level={2} callback={callback} text="Compression" />
      <b>
        AVIF performs exceptionally well in low-fidelity, high-appeal situations
      </b>
      , providing similar file sizes to JPEG while dramatically increasing the
      image's overall appeal and visual quality.
      <br />
      JPEG 2000 also represents a jump over its predecessor JPEG. However, the{" "}
      <b>
        JP2 focus on higher-fidelity photos allows AVIF to pull ahead in
        low-fidelity scenarios.
      </b>{" "}
      For example, a low-fidelity AVIF photo has a similar file size to a JPEG
      2000 photo. Still, it lacks the same high appeal as AVIF.
      <br />
      An appeal is the absence of compression artifacts like color banding and
      blockiness that makes a photo look bad. Highly compressed AVIF images look
      better with minor color banding than JPEG 2000 photos of the same file
      size.
      <br />
      <b>
        JPEG 2000 performs better with high-fidelity and lossless images,
      </b>{" "}
      with file sizes generally smaller than AVIF's lossless efforts. However,{" "}
      <b>
        the vast majority of pictures on the web are the low-fidelity,
        high-appeal files that AVIF loves so much.
      </b>
      <br />
      <H level={2} callback={callback} text="Speed" />
      JPEG 2000, like its predecessor, is a reasonably fast format to work with.{" "}
      <b>
        Single-core encode and decode speeds beat out the somewhat sluggish
        AVIF, allowing JPEG 2000 to impress even on unpowered machines.
      </b>
      <br />
      <b>JPEG 2000 also supports parallelization</b>, which allows the image
      coder to take advantage of multiple cores and threads to improve decoding
      and encoding speeds.{" "}
      <b>AVIF can also take advantage of multi-core processors in this way</b>
      . Still, the good single-core speeds make JPEG 2000 faster to work with,
      even on powerful multi-core processors.
      <br />
      <b>JPEG 2000 also supports progressive image decoding</b>, allowing
      lower-quality previews to be displayed while the image is still being
      decoded, improving page load times. This is a feature that is missing on
      AVIF.
      <br />
      <b>
        Overall, JPEG 2000 benefits from better encode and decode speeds than
        AVIF.
      </b>
      <br />
      <H level={2} callback={callback} text="Other Features" />
      <b>In general, JPEG 2000 doesn't support animation</b>.
      <b>
        A separate related file format for motion sequences called Motion JPEG
        2000
      </b>{" "}
      is based on the MP4 and QuickTime format. However, this is closure to a
      video codec than an efficient means for an animated photo.
      <br />
      <b>
        Motion JPEG 2000 (MJP2) does not use the inter-frame compression
      </b>{" "}
      found in most video codecs, including AVIF sequences. This means{" "}
      <b>MJP2 animations</b> are more scalable but have{" "}
      <b>vastly greater file sizes</b> and can stretch visitor bandwidth.
      <br />
      AVIF is derived from a video codec, and as you can expect, animation works
      flawlessly with this format. Using intra-frame compression adds greater
      file efficiency. Sequenced
      <b>AVIF pulls ahead of MJP2 or web delivery of sequenced images.</b>
      <br />
      <b>Both AVIF and JPEG 2000 supports alpha transparency</b>, unlike the
      original 1992 JPEG standard.
      <br />
      However,
      <b>
        AVIF boasts some impressive modern features like depth maps and
        overlays.
      </b>
      Depth maps allow effects to be added to an AVIF image. In contrast,
      overlays allow for independently encoding layers to be contained on one
      image, improving the appeal of pictures like text on photo backgrounds.
      <br />
      <H level={2} callback={callback} text="Support" />
      JPEG 2000 has had a tough 21 years attempting to gain mainstream support
      from web browsers. Apart from
      <b>full support from Safari</b> since Safari 5 in 2010,
      <b>no other major web browser supports JPEG 2000. </b>
      This is a reasonably damaging statistic, given Safari has a market share
      of only 9.7% on desktop.
      <br />
      However,
      <b>
        AVIF has gained full support from Chrome and Opera on the desktop and
        Samsung Internet on mobile
      </b>
      . Firefox users can enable AVIF support in the about:config page. However,
      this won't allow Firefox users to view sequenced AVIFs. Safari and
      Microsoft Edge do not support any aspect of AVIF.
      <br />
      <H level={2} callback={callback} text="Conclusion for Nerds" />
      In many aspects, JPEG 2000 was a very forward-thinking image format. With
      its support for high-bit depth photos and astronomical image dimension
      limits, <b>JPEG 2000 is a truly impressive format on the spec sheet.</b>
      <br />
      However, some may argue that JPEG 2000 was ahead of its time. Bloated by a
      less than adequate compression algorithm,
      <b>
        {" "}
        JP2 struggled with market adoption at its release and boasted a woeful
        browser support record.
      </b>
      <br />
      AVIF is a more suitable image format for the modern web
      <b>
        . With greater low-fidelity, high-appeal compression, and excellent
        animation support, AVIF has a real shot at becoming the following
        dominant image format.
      </b>{" "}
      It still has some leaps to make regarding browser support with Safari and
      Edge yet to adopt. However, with a comprehensive feature set and
      significant momentum around the format, we expect AVIF to overcome any
      support difficulties to break through into the mainstream.
      <br />
      Our outlook for JPEG 2000 is nowhere near as optimistic.
      <br />
      <H level={2} callback={callback} text="Conclusion for Marketeers" />
      JPEG 2000 is, to most marketers, a file format lost to time. It struggled
      to make a market impact when it was released at the turn of the
      millennium, and the story stays true right now.
      <br />
      AVIF brings efficient animated images, excellent compression, and modern
      features like overlays to its fight against JPEG 2000. However, the
      knock-out blow comes in the form of browser support.
      <br />
      <b>JPEG 2000 is supported by no major browser barring Safari.</b> For most
      market users, that's enough for them never to use the image format.
      <br />
      AVIF offers an exciting future for image delivery. Visitors
      <b> can look forward to better-looking photos </b>
      while reducing the load on their data caps and bandwidth. AVIF hasn't got
      a clean sweep of browser support, with Firefox (sort of), Edge, and Safari
      still to go.
      <br />
      <b>But, AVIF is the best all-rounder image format</b>. Its open and
      royalty-free nature gives us the confidence to predict{" "}
      <b>
        it will go all the way and be crowned king as the dominant image format
        for web delivery.
      </b>
      <br />
    </Blog>
  );
}
