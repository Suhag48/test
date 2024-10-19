//import react states
import { useEffect, useState } from "react";

import HeroImg from "../../assets/images/img5.jpg";

const Slide = () => {
  const SlideText = [
    {
      heading: "Thousands of Products",
      text: "Freedom to choose items from Thousands of Products.",
    },
    {
      heading: "Qualitiful Products",
      text: "We ensure our customers qualityful products.",
    },
    {
      heading: "Best Services",
      text: "Our team is always ready to help you.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change slides at regular intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SlideText.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [SlideText.length]);

  return (
    <>
      <section className="pt-12 md:pt-20 mb-4">
        <div className="flex items-center mt-8 md:mt-[1px] relative">
          <img src={HeroImg} alt="heroImg" className="w-screen h-[230px] sm:h-auto md:h-[500px] lg:h-[600px]" />
          <div className="flex flex-col items-center justify-center w-full h-full absolute text-center text-gray-200 px-1">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium">
              {SlideText[currentIndex].heading}
            </h2>
            <p className="mt-4 md:mt-6 text-sm sm:text-base text-gray-200">
              {SlideText[currentIndex].text}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Slide;
