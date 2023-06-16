import { useState } from "react";
import ReactCompareImage from "react-compare-image";
import { checkAvifSupport } from "../../utils/avifSupportCheck";

export default function ImageComparison() {
  const [selectedImage, setSelectedImage] = useState("butterfly");
  const [imageSize, setImageSize] = useState("18");
  const [support, setSupport] = useState(false);

  checkAvifSupport()
    .then((supported) => setSupport(true))
    .catch(() => setSupport(false));

  const sliderImages = [
    ["butterfly", "18"],
    ["doggo", "44"],
    ["partyhand", "18"],
    ["party", "60"],
    ["explosion", "23"],
    ["vector", "35"],
  ];

  const sliderButtons = sliderImages.map((item, index) => (
    <button
      key={index}
      style={{ backgroundImage: `url(/images/${item[0]}.avif)` }}
      className={`mr-2 w-8 h-8 bg-center bg-cover bg-no-repeat ${
        selectedImage == item[0] ? "border-4 border-pink-700" : "opacity-50"
      }`}
      onClick={() => {
        setSelectedImage(`${item[0]}`);
        setImageSize(`${item[1]}`);
      }}
      name={`avif vs jpg comparison image ${index + 1}: ${item[0]}`}
    />
  ));

  return (
    <div>
      {support === true && (
        <section className="container px-2">
          <div className="relative">
            <div className="flex mt-2 mb-2">{sliderButtons}</div>
            <div className="relative">
              <ReactCompareImage
                leftImage={`/images/${selectedImage}.avif`}
                rightImage={`/images/${selectedImage}.jpg`}
                leftImageAlt="jpg image"
                rightImageAlt="avif image"
                sliderLineWidth={4}
                handle={
                  <div
                    role="button"
                    className="py-4 px-2 bg-pink-700 rounded-xl"
                    tabIndex={0}
                    id="handle"
                  />
                }
                sliderLineColor="rgba(255,255,255,0.2)"
                sliderPositionPercentage={0.5}
              />

              <p
                className="absolute top-4 left-4 py-2 px-3 rounded-md bg-white/10"
                id="avif"
              >
                {"avif · " + imageSize + "kb"}
              </p>
              <p
                className="absolute top-4 right-4 py-2 px-3 rounded-md bg-white/10"
                id="jpg"
              >
                {"jpg · " + imageSize + "kb"}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
