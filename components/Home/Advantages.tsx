import visualizer1 from "@assets/visualizer-1.svg";
import visualizer2 from "@assets/visualizer-2.svg";
import visualizer3 from "@assets/visualizer-3.svg";
import visualizer4 from "@assets/visualizer-4.svg";
import visualizer5 from "@assets/visualizer-5.svg";
import visualizer6 from "@assets/visualizer-6.svg";
import visualizer7 from "@assets/visualizer-7.svg";
import visualizer8 from "@assets/visualizer-8.svg";
import visualizer9 from "@assets/visualizer-9.svg";
import visualizer10 from "@assets/visualizer-10.svg";
import visualizer11 from "@assets/visualizer-11.svg";
import visualizer12 from "@assets/visualizer-12.svg";

interface Advantages {
  pre?: string;
  text?: string;
  post?: string;
  number?: string;
  image?: any;
  children: any;
}

function AdvantageItem(props: Advantages) {
  return (
    <div
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      className="overflow-hidden relative z-50 text-lg rounded-xl transition-all duration-200 ease-out transform-gpu hover:scale-105 group bg-bg-600 hover:bg-bg-500"
      style={{
        padding: "calc(100% - 8px) 8px 8px 8px",
      }}
    >
      <div className="absolute top-4 right-4 left-4 ease-in">
        {props.children}
      </div>
      <div
        className="absolute top-0 right-0 bottom-0 left-0 z-0 bg-center bg-contain rounded-lg ease-out origin-center group-hover:opacity-5 group-hover:scale-110 background-no-repeat group-hover:blur-md"
        id={props.number}
        style={{
          backgroundImage: `url(${props.image})`,
          opacity: "0.025",
          filter: "blur(4px)",
        }}
      ></div>
    </div>
  );
}

export default function Advantages() {
  return (
    <section
      className="container relative px-3 max-w-screen-xl"
      id="avifadvantages"
    >
      <div className="grid grid-cols-1 gap-4 mb-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AdvantageItem number="visualizer-1" image={visualizer1}>
          <span className="font-bold text-pink-700">reduces file size </span>of
          images by 20-90% for faster page loading
        </AdvantageItem>
        <AdvantageItem number="visualizer-2" image={visualizer2}>
          <span className="font-bold text-pink-700">
            decreases required bandwidth{" "}
          </span>
          for service providers
        </AdvantageItem>
        <AdvantageItem number="visualizer-3" image={visualizer3}>
          <span className="font-bold text-pink-700">
            actively developed by tech giants{" "}
          </span>
          like Google, Apple and Microsoft
        </AdvantageItem>
        <AdvantageItem number="visualizer-4" image={visualizer4}>
          <span className="font-bold text-pink-700">
            open to use and royalty-free{" "}
          </span>
          for everyone
        </AdvantageItem>
        <AdvantageItem number="visualizer-5" image={visualizer5}>
          provides the{" "}
          <span className="font-bold text-pink-700">
            highest quality to compression rate{" "}
          </span>
          ever achieved
        </AdvantageItem>
        <AdvantageItem number="visualizer-6" image={visualizer6}>
          already{" "}
          <span className="font-bold text-pink-700">
            supported by Chrome, Opera and Firefox
          </span>
        </AdvantageItem>
        <AdvantageItem number="visualizer-7" image={visualizer7}>
          <span className="font-bold text-pink-700">
            supports transparency{" "}
          </span>
          and is therefore a better version of PNG
        </AdvantageItem>
        <AdvantageItem number="visualizer-8" image={visualizer8}>
          <span className="font-bold text-pink-700">
            supports animated frames{" "}
          </span>
          which can replace GIFs and aPNGs
        </AdvantageItem>
        <AdvantageItem number="visualizer-9" image={visualizer9}>
          <span className="font-bold text-pink-700">embraces HDR </span>
          with 12-bit color depth and wide color gamut
        </AdvantageItem>
        <AdvantageItem number="visualizer-10" image={visualizer10}>
          provides{" "}
          <span className="font-bold text-pink-700">
            future-proof VP-10 codec technology
          </span>
        </AdvantageItem>
        <AdvantageItem number="visualizer-11" image={visualizer11}>
          latest GPUs already support{" "}
          <span className="font-bold text-pink-700">hardware decoding</span>
        </AdvantageItem>
        <AdvantageItem number="visualizer-12" image={visualizer12}>
          <span className="font-bold text-pink-700">
            rich of features for smartphones{" "}
          </span>
          like live photos
        </AdvantageItem>
      </div>
    </section>
  );
}
