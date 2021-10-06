import "atropos/css";
import Atropos from "atropos/react";

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
    <Atropos
      activeOffset={20}
      shadowScale={1.01}
      rotateXMax={20}
      scaleClassName="rounded-lg h-full"
      rotateClassName="rounded-lg h-full"
      innerClassName="rounded-lg h-full"
      durationEnter={200}
      shadow={false}
    >
      <div
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        className="h-full text-center p-4 grid overflow-hidden relative z-50 rounded-lg transition-all duration-200 ease-out transform-gpu hover:scale-105 group bg-bg-600"
        data-atropos-offset="0"
      >
        <div
          className="mb-4 h-6 z-0 bg-center bg-no-repeat bg-contain rounded-lg ease-out origin-center background-no-repeat group-hover:scale-200 transition-all duration-500"
          data-atropos-offset="10"
          id={props.number}
          style={{
            backgroundImage: `url(${props.image})`,
          }}
        ></div>
        <div
          className="ease-in h-auto md:h-7 leading-snug"
          data-atropos-offset="2"
        >
          {props.children}
        </div>
        <div
          className="absolute top-0 right-0 bottom-0 left-0 bg-cover bg-center md:bg-no-repeat"
          style={{
            backgroundImage: `url(${props.image})`,
            opacity: "0.025",
            filter: "blur(4px)",
          }}
        ></div>
      </div>
    </Atropos>
  );
}

export default function Advantages() {
  return (
    <section className="container relative p-4 lg:p-0" id="avifadvantages">
      <div className="grid grid-cols-1 gap-4 mb-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <AdvantageItem number="visualizer-1" image={visualizer1}>
          <span className="font-bold text-pink-700 leading-snug">
            reduces file size{" "}
          </span>
          of images by 20-90%
        </AdvantageItem>
        <AdvantageItem number="visualizer-3" image={visualizer3}>
          <span className="font-bold text-pink-700 leading-snug">
            developed by tech giants{" "}
          </span>
          like Google
        </AdvantageItem>
        <AdvantageItem number="visualizer-4" image={visualizer4}>
          open to use and{" "}
          <span className="font-bold text-pink-700 leading-snug">
            royalty-free{" "}
          </span>
        </AdvantageItem>
        <AdvantageItem number="visualizer-6" image={visualizer6}>
          already{" "}
          <span className="font-bold text-pink-700 leading-snug">
            70% browser support
          </span>
        </AdvantageItem>
        <AdvantageItem number="visualizer-7" image={visualizer7}>
          <span className="font-bold text-pink-700 leading-snug">
            supports transparency{" "}
          </span>
          to replace PNG
        </AdvantageItem>
        <AdvantageItem number="visualizer-8" image={visualizer8}>
          <span className="font-bold text-pink-700 leading-snug">
            supports animations{" "}
          </span>
          to replace GIFs
        </AdvantageItem>
        <AdvantageItem number="visualizer-9" image={visualizer9}>
          <span className="font-bold text-pink-700 leading-snug">
            embraces HDR{" "}
          </span>
          and 12-bit color depth
        </AdvantageItem>
        <AdvantageItem number="visualizer-10" image={visualizer10}>
          future-proof{" "}
          <span className="font-bold text-pink-700 leading-snug">
            VP-10 codec technology
          </span>
        </AdvantageItem>
        <AdvantageItem number="visualizer-11" image={visualizer11}>
          latest GPUs support{" "}
          <span className="font-bold text-pink-700 leading-snug">
            hardware decoding
          </span>
        </AdvantageItem>
        <AdvantageItem number="visualizer-12" image={visualizer12}>
          <span className="font-bold text-pink-700 leading-snug">
            full of features{" "}
          </span>
          for mobile phones
        </AdvantageItem>
      </div>
    </section>
  );
}
