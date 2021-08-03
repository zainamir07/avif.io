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
      postMeta={meta.avifVsWebp}
      posts={[meta.avifVsJpg, meta.avifVsJpegxl, meta.avifVsWebp2]}
    >
      <ContentTable contentTable={contentTable} />
      <H level={2} callback={callback} text="Introduction" />
      The image format wars are heating up, and two front-runners have emerged:
      WEBP and AVIF. Both vying to dethrone JPEG as the dominant image file
      format for sharing images over the internet, both AVIF and WEBP outperform
      the aging JPEG format in many important ways.
      <br />
      <b>
        First developed by Google in 2010 as an open format for compressed
        true-color graphics
      </b>
      , WebP's lossy compression algorithm is based on the VP8 video format and
      the RIFF file container.
      <br />
      Similarly,
      <b>AVIF is derived from the AV1 video codec</b>. AVIF is a relatively new
      kid on the block,
      <b>having been first released in 2019.</b> AVIF's youth as an image format
      has its benefits and drawbacks.
      <br />
      The million-dollar question is, however, which is better: AVIF or WEBP?
      This article aims to answer this question by comparing the performance and
      features of these two advanced image formats &ndash; and ultimately decide
      which is more deserving of the crown as the dominant image file format for
      web delivery.
      <br />
      <H level={2} callback={callback} text="Quality and limits" />
      AVIF as a format derived from frames of video with the AV1 codec, there
      are some image dimension limitations adopters will need to look out for.
      <b>AVIF has an image resolution limit of 8193 x 4320</b>, and this is the
      size of an 8K video frame.
      <br />
      It is possible to
      <b>exceed this limit by rendering independently encoded tiles</b>. But,
      with <b>artifacts at the edges of each tile</b>, AVIF is unsuitable for
      large resolution images.
      <br />
      <b>WebP</b> also has a hard limit to an image's frame size, with its
      maximum dimension being
      <b>16,383 x 16,383.</b> While this is an improvement over AVIF, there is
      no way to push past this. Neither formats compare to the limits of PNG and
      JPEG 2000 with 2500 megapixels and 5000-megapixel max dimensions,
      respectively.
      <br />
      WebP falls short with its limitations compared to AVIF because of its wide
      color gamut and precision support.
      <b>WebP only supports a max bit depth of 8-bit</b> and does support wide
      gamut/HDR images. WebP also does not support images without chroma
      subsampling.
      <br />
      <b>
        AVIF flexes a max bit depth of 10, supports 4:4:4, and supports HDR
        photos
      </b>
      . Despite WebP's advantage with max dimension, we find the other
      limitations too great of a sacrifice to hand the win to WebP for this
      category.
      <br />
      <H level={2} callback={callback} text="Compression" />
      WebP was designed to provide more outstanding quality (appeal) while
      encoding images with similar file sizes to JPEG. While WebP certainly does
      achieve this,
      <b>
        the newer and more advanced AVIF image format does edge ahead in
        compression to appeal ratio.
      </b>
      <br />
      High appeal photos do not include any nasty compression artifacts like
      color banding or blockiness and are a desirable metric for images to look
      good on the web.
      <br />
      <b>WebP only performs marginally better than JPEG</b> in file size for
      low-fidelity compression, but with noticeable improvements in appeal. A
      low fidelity 68.3kb JPEG photo only translates to a 67.7kb WebP file.
      <br />
      The same image converted to AVIF renders a similar 67.6kb file. However,
      <b>
        this AVIF image has a much higher appeal than the equivalent WebP file
      </b>
      &ndash; with noticeably less blockiness and color banding.
      <br />
      WebP's compression performance improves with medium fidelity photos but
      never surpasses AVIF in its file size to appeal ratio.
      <br />
      <b>
        For lossless compression, AVIF and WebP perform similarly with both
        non-photographic images like graphic design and photographs.
      </b>
      <br />
      <H level={2} callback={callback} text="Speed" />
      For web delivery, decode speeds are essential for the performance of
      websites and downloads.
      <b>
        AVIF struggles with single-core speeds with poor single-core encoding
        speed and only marginally better decode speeds.
      </b>
      <br />
      <b>
        WebP's single-core encode speeds and decode speeds are much shorter,
      </b>
      with overall single-core speed trumping AVIF. Clear winner, right?
      <br />
      Single-core speeds are a lot less critical in our modern computing
      landscape than they were in the past. That's because CPUs have been, for
      many years now, tending towards higher core counts and more threads. This
      is where <b>parallelization</b> makes a considerable difference for AVIF.
      <b>
        AVIF decodes can take advantage of multiple cores to turn poor
        single-core performance into good multi-core decoding speeds.
      </b>
      <br />
      With many mobiles and desktops now using 8-core processors, multi-core
      performance is critical. As an older format,
      <b>
        WebP's parallelization is less effective, making AVIF more future-proof
        despite its poor single-core speeds.
      </b>
      <br />
      <H level={2} callback={callback} text="Other Features" />
      <b>Both AVIF and WEBP support animation </b>&ndash; however, with AVIF's
      heritage as a video codec, encoding animation with AVIF is stridden more
      efficient with AVIF than WEBP.
      <b>
        Sequenced AVIF files have much smaller file sizes than animated WEBP
      </b>
      . However, even WEBP beats out legacy formats like GIF and aPNG.
      <br />
      An animated image with a file size of 1.5MB and 67 frames can be converted
      to a sequenced AVIF file of only 87kb. The benefits of this dramatically
      more efficient animation compression become even more significant the
      longer and more detailed animated images become.
      <br />
      For text and graphics work,
      <b>both AVIF and WEBP support alpha transparency</b>. Although,{" "}
      <b>AVIF supports overlays</b> allowing for distinct layers of an image to
      be encoded separately. AVIF also supports depth maps, allowing for effects
      to be easily applied to images.
      <br />
      <b>Both AVIF and WEBP also lack progressive decoding</b>, which
      accelerates page loads by providing a low-resolution preview image before
      the entire image has been decoded successfully. This feature is reserved
      for JPEG and its descendants JPEG 2000 and JPEG XL.
      <br />
      <H level={2} callback={callback} text="Support" />
      As a young file format,
      <b>AVIF is behind other older image formats for browser support.</b>
      WEBP is, across the board, currently more supported than AVIF. However,
      the surprising level of support for its age provides a good outlook on
      AVIF's future support across web browsers.
      <br />
      <b>
        On the desktop, both Chrome and Opera are the first to provide full
        support for AVIF.
      </b>
      Firefox users can enable AVIF support in the about:config page. However,
      this doesn't include support for animated images. Support is still,
      however, missing for Safari and Microsoft Edge.
      <br />
      On mobile,
      <b>
        Chrome for Android, Samsung Internet, and the Android Browser all
        support AVIF fully
      </b>
      . Support is unfortunately currently missing for Safari on iOS.
      <br />
      <b>
        WEBP is supported across the board by Edge, Firefox, Chrome, Safari, and
        Opera. All major mobile browsers also support WEBP.
      </b>
      <br />
      <H level={2} callback={callback} text="Conclusion for Nerds" />
      WEBP, when released in 2010, was a compelling replacement to the tired and
      aging JPEG and PNG formats. However, eleven years later, WEBP lacks common
      features that have been ubiquitous in the modern image format landscape.
      These include 4:4:4, HDR images, and high bit depth. Therefore, despite
      its almost universal browser support, it is challenging to foresee WEBP
      becoming a dominant image format.
      <br />
      With generally better compression, both lossy and lossless, and excellent
      performance with low-fidelity, high-appeal photos (the most popular type
      of images shared on the web), AVIF is a more versatile image format. While
      it does lag somewhat behind WEBP with browser support, we expect Firefox
      and Safari to follow suit and provide full support for AVIF soon. Once
      this happens,
      <b>we expect AVIF to become the dominant image format</b>
      for both still and animated images for the web.
      <br />
      <H level={2} callback={callback} text="Conclusion for Marketeers" />
      We expect most people haven't come across WEBP images all that often due
      to its relatively low market adoption. We don't expect this to improve any
      time soon. With more significant parallelizing potential with AVIF for
      encoding and decode speeds than WEBP, you should find AVIF images decode
      just as fast as WEBP.
      <br />
      HDR images will look impressive on great displays, and animated AVIF files
      should be much less taxing on your broadband's bandwidth and data caps.
      While AVIF browser support is still somewhat limited,
      <b>
        we think the great mix of features and compression performance makes
        AVIF an excellent contender to become the dominant image format for
        everyone: mobile and desktop.
      </b>
      <br />
    </Blog>
  );
}
