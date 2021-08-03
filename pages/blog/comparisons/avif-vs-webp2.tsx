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
      postMeta={meta.avifVsWebp2}
      posts={[meta.avifVsHeif, meta.avifVsWebp, meta.avifVsJpegxl]}
    >
      <ContentTable contentTable={contentTable} />
      <H level={2} callback={callback} text="Introduction" />
      Google is currently developing the successor to the somewhat unpopular
      WEBP format first released in 2010. It's called WEBP2, and it aims to
      solve many of the users' issues with Google's initial image file format.
      <b>
        WebP2 is a highly experimental format, and its feature-set and
        performance are likely to change significantly as development continues.
      </b>
      <br />
      Compared to AVIF, another up-and-coming image file format, we found that
      the original WEBP standard couldn't perform nearly as well in compression,
      performance, and market adoption as AVIF.
      <br />
      <b>
        Can WEBP2 build on any of WEBP's past failures, and how does it compare
        to the coveted AVIF image format?
      </b>
      Here's how AVIF and WEBP2 compare, and ultimately which you should use for
      image delivery.
      <br />
      <H level={2} callback={callback} text="Quality and limits" />
      AVIF is derived from the AV1 codec and so possesses many of AV1's
      limitations. AVIF has a maximum image dimension size of 8193 x 4320
      pixels. This is roughly the size of an 8K video frame. It is possible to
      circumvent this limit by independently encoding tiles to make up larger
      images. However, this introduces some artifacts at the edges of these
      tiles that affect the overall appeal of larger images. Google hasn't
      currently finalized the WEBP2 standard, but we expect it to exceed AVIF in
      its dimension limits. The original WebP format had an image dimension of
      16,383 x 16,383. We don't currently know whether Google plans to increase
      this, but it will exceed AVIF's in any event. Google says the use case for
      WEBP2 includes "medium-range dimension" images, which match where WEBP is
      currently placed with its dimension limits. Google plan on including full
      10-bit color support along with support for HDR10 images. AVIF already
      provides support for 10-bit precision and also supports wide color gamuts
      like Rec. 709. We expect WEBP2 to match these precision specifications.
      <H level={2} callback={callback} text="Compression" />
      The original WEBP format suffered when compared to AVIF in compression
      &ndash; especially with lossy compression. WEBP2 plans to improve on its
      predecessor,
      <b>
        pledging to deliver more efficient lossy compression with a 30%
        improvement over its predecessor.
      </b>
      <br />
      <b>
        With low-fidelity, small photos, AVIF outshines most of its competition
      </b>
      . It provides some excellent file size efficiency when compared to JPEG
      and retains a high level of appeal. An appeal is how good a photo looks,
      measured by the absence of compression artifacts like nasty color banding
      or blockiness.
      <br />
      Google's sample image comparisons show how an 87.8kb WEBP2 image can be
      produced as an 86.6kb AVIF file. These sample images show how WEBP2 marks
      a massive improvement in appeal over WEBP and how AVIF can still retain
      more detail and overall appeal than WEBP2 in its current form.
      <br />
      <b>
        WEBP2 has, however, shown some serious gains when it comes to
        high-fidelity photos.
      </b>
      The same image compressed with a higher fidelity renders a 248kb AVIF
      photo compared to a 246kb WEBP2 image. It isn't easy to pick out which
      performs better with the appeal. However, we still believe AVIF holds
      slightly better details in photos.
      <br />
      <b>The experimental format handles lossless images efficiently</b>
      . An AVIF lossless image of 1844kb is a 1646kb WEBP2 image. Considering
      the format hasn't been fully optimized yet, we're seriously impressed with
      how well WEBP2 handles lossless scenarios.
      <br />
      <H level={2} callback={callback} text="Speed" />
      <b>In its development</b>, Google claims the format is
      <b>
        currently five times slower than the preceding WEBP standard for
        encoding
      </b>
      when using lossy compression. There isn't too much data yet on its decode
      speed. Still, we expect the story to be similar, given its lack of
      optimization.
      <br />
      <b>
        This, however, doesn't stop it from already overtaking the notoriously
        slow AVIF file format in single-core encode speeds.
      </b>
      AVIF boasts slow single-core compression speeds. WEBP2 is still 2-times
      slower for decoding than AVIF, although Google plans to reach parity with
      decompressing speeds.
      <br />
      <b>AVIF supports parallelization</b>, which allows the image coder to take
      advantage of multiple cores and threads to improve encode and decode
      speeds. WebP's parallelization wasn't as efficient as AVIF's, so we expect
      that WebP2's gains in performance will be down to better use of
      multi-threaded hardware.
      <br />
      By parallelizing compression and decompression, AVIF can help offset its
      poor single-core performance. As CPUs trend towards higher core counts, we
      expect good parallelizing performance to become more critical in the
      coming years.
      <br />
      <H level={2} callback={callback} text="Other Features" />
      <b>AVIF supports alpha transparency</b>, unlike JPEG, allowing it to be
      more suitable with graphics and text images.
      <b>AVIF also includes support for animations</b>. This is a task it
      succeeds in due to its relation to the AV1 video codec.
      <br />
      <b>
        WEBP2 will also support these features, with alpha transparency
        essential for the preceding WEBP format
      </b>
      . Animation with WEBP2 is primarily tuned towards short animations and
      will improve upon WEBP's implementation.
      <br />
      <b>AVIF supports overlays and depth maps</b>. Overlays enable layers to
      help maintain the clarity of text and graphics over highly compressed
      photo backgrounds. Depth maps allow users to add effect to foregrounds and
      backgrounds.
      <br />
      <b>These features were missing from the original WEBP</b>. At this stage
      in its successor's development cycle,
      <b>we don't know whether Google includes this.</b>
      <br />
      Google tells us to expect
      <b>lightweight incremental decoding</b> and
      <b>ultra-light previews </b>as crucial features of WEBP2. We're incredibly
      excited for these, as AVIF's
      <b>lack of progressive decoding </b>doesn't allow the format to render
      low-resolution previews. At the same time, the rest of the image is
      decoded. This is a method that JPEG uses to speed up page loads, and it
      would be nice to see this included with WEBP2.
      <br />
      Overall, Google is experimenting with some exciting features for WEBP2.
      However, there is no guarantee that they will make it into the final
      implementation of the format.
      <b>
        AVIF, therefore, holds the edge with the feature-set currently available
        for the image format.
      </b>
      <br />
      <H level={2} callback={callback} text="Support" />
      Despite its young age, being released in 2019,
      <b>AVIF has enjoyed a surprisingly sharp market uptake.</b>
      <b>Google Chrome introduced full support</b> for the image format in 2020,
      with Opera following swiftly after.
      <br />
      <b>Safari and Microsoft Edge are yet to support the standard</b>
      . Firefox users can only display AVIF images (though Firefox doesn't
      support animated AVIFs) if they enable it in their browser config.
      Although, with this moment, we do expect AVIF to reach universal support
      eventually.
      <br />
      <b>WEBP2 is entirely experimental</b> and is not available to the public
      yet.
      <b>Understandably, no browser supports the image format.</b>
      It is only made available for testing purposes. Google doesn't recommend
      it for any continued or heavy use yet due to its instability.
      <br />
      <H level={2} callback={callback} text="Conclusion for Nerds" />
      WEBP2 is an entirely experimental image format. We shouldn't expect it to
      be released to the public in quite some time, let alone see universal
      adoption. It includes some exciting features, and we're particularly
      excited about the improved lightweight incremental decoding.
      <br />
      WEBP2 will inevitably be a significant upgrade over the WEBP standard when
      it is released. It will include features like better animation support,
      more excellent lossy compression, and ultra-light previews.
      <br />
      However, we don't expect a massive improvement over AVIF. Moreover, it
      will take WEBP2 quite a while after its release to achieve the same
      browser support AVIF enjoys.
      <br />
      <b>
        AVIF offers a rich feature set, significant low-fidelity compression,
        and good lossless compression to become a catch-all image format for the
        future.
      </b>
      WEBP2 does position itself to compete with AVIF when released. Still, we
      anticipate AVIF will already be dominant when Google completes the
      development of WEBP2, and it will be far too late.
      <br />
      <H level={2} callback={callback} text="Conclusion for Marketeers" />
      <b>Most people will not be able to use WEBP2 for a long while.</b>
      It is highly experimental and won't be used for severe image delivery for
      quite some time. With no browser currently supporting the in-development
      image format, marketeers will not benefit from any experimental features
      Google is cooking up.
      <br />
      <b>WEBP2 will significantly improve over its predecessor</b>, and when the
      format is released, we expect its features to impress. For lossless image
      delivery, marketers can benefit from much smaller file sizes than AVIF.
      However, for web delivery, AVIF will still hold the edge with low-fidelity
      lossy compression.
      <br />
      Users don't have to wait to enjoy the benefits of AVIF. With features like
      overlays currently being used masterfully by services like Netflix,
      <b>AVIF is distinguishing itself as a fantastic replacement for JPEG</b>
      with its significant lossy compression.
      <b>We think AVIF has the spec sheet and the momentum </b>
      to become<b> the dominant image file format</b> for web delivery.
      <br />
    </Blog>
  );
}
