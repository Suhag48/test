// import react icons
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";

//import image
import reviewerOne from "../../assets/reviewer/1.jpg";
import reviewerTwo from "../../assets/reviewer/2.jpg";
import reviewerThree from "../../assets/reviewer/3.jpg";
import reviewerFour from "../../assets/reviewer/4.jpg";
import reviewerFive from "../../assets/reviewer/5.jpg";
import reviewerSix from "../../assets/reviewer/6.jpg";
import reviewerSeven from "../../assets/reviewer/7.jpg";
import reviewerEight from "../../assets/reviewer/8.jpg";
import reviewerNine from "../../assets/reviewer/9.jpg";

const slidesData = [
  {
    reviewer: reviewerOne,
    name: "Suhag Rana",
    reviewText:
      "“EasyBuy has become my go-to online store. The selection is vast, and the prices are unbeatable. I was amazed at how quickly my order arrived, and everything was packaged neatly. Plus, their website is super easy to use, making the entire shopping experience enjoyable. Highly recommend!”",
  },

  {
    reviewer: reviewerTwo,
    name: "Abdur Rahman",
    reviewText:
      "“I had a smooth shopping experience on EasyBuy. The search filters helped me find what I needed in minutes, and the checkout process was a breeze. The best part? The product I ordered looked exactly like the pictures on the site. I’m really happy with my purchase!”",
  },

  {
    reviewer: reviewerThree,
    name: "Rukon Sorkar",
    reviewText:
      "“I ordered a few electronics from EasyBuy, and I’m impressed with both the product quality and the service. The delivery was faster than expected, and customer support was quick to respond to my queries. I’ll definitely shop here again!”",
  },

  {
    reviewer: reviewerFour,
    name: "Imran Hossen",
    reviewText:
      "“EasyBuy offers excellent value for money. I found some amazing deals on the site, and their return policy is straightforward, which gives me confidence in trying new items. Great customer service too, very responsive and helpful.”",
  },

  {
    reviewer: reviewerFive,
    name: "Dulal Miya",
    reviewText:
      "“I’ve shopped on several eCommerce sites, but EasyBuy stands out for its ease of navigation and reliability. My order arrived intact and right on time. Their customer service is top-notch, and the whole process was hassle-free. Highly recommend for online shopping!”",
  },

  {
    reviewer: reviewerSix,
    name: "Md. Rafique",
    reviewText:
      "“I’ve had issues with online shopping before, but EasyBuy was a totally different experience. The entire process, from browsing to delivery, was smooth and efficient. Their customer service even followed up after my purchase to ensure everything was satisfactory. Five stars!”",
  },

  {
    reviewer: reviewerSeven,
    name: "Raisan Zannat",
    reviewText:
      "“Shopping on EasyBuy was a pleasant surprise! The website layout is intuitive, and I found what I was looking for without any hassle. The items arrived in perfect condition, and the quality exceeded my expectations. I’ll definitely be a returning customer.”",
  },

  {
    reviewer: reviewerEight,
    name: "Cutie Girl",
    reviewText:
      "“Shopping on EasyBuy was a pleasant surprise! The website layout is intuitive, and I found what I was looking for without any hassle. The items arrived in perfect condition, and the quality exceeded my expectations. I’ll definitely be a returning customer.”",
  },

  {
    reviewer: reviewerNine,
    name: "Rasel",
    reviewText:
      "“EasyBuy is one of the best online stores I’ve used. The product range is incredible, and I appreciated the detailed product descriptions. Everything I ordered was just as described, and the delivery was fast. A fantastic site for both occasional and regular shoppers.”",
  },
];

const FeedbackSlide = () => {
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 1000;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 1000;
  };

  // reducing big text based on Condition
  const textSlice = (text) => {
    if (text.length > 200) {
      return text.slice(0, 200) + "...";
    } else {
      return text;
    }
  };

  return (
    <section className="px-4 py-12 md:py-20 container mx-auto">
      <h2 className="text-xl sm:text-2xl md:text-3xl mb-8 md:mb-12 text-center text-gray-800 font-medium">
        Customer Review
      </h2>
      <div className="flex items-center bg-slate-200">
        <div className="cursor-pointer mr-2 ml-4">
          <SlArrowLeft size={20} onClick={slideLeft} />
        </div>
        <div
          id="slider"
          className="overflow-x-auto no-scrollbar whitespace-nowrap scroll-smooth"
        >
          {slidesData.map((item, index) => {
            const { name, reviewer, reviewText } = item;

            return (
              <div
                key={index}
                className="w-64 md:w-72 lg:w-76 border border-stone-200 text-gray-700 rounded-md inline-block mx-2 whitespace-normal py-3 px-2 md:px-4 bg-slate-200 shadow-2xl"
              >
                <img
                  src={reviewer}
                  alt="reviewerphoto"
                  className="rounded-full w-16 h-16 mx-auto"
                />
                <h2 className="text-center mt-3 md:text-lg mb-1 text-gray-800"> {name} </h2>
                <p className="break-all leading-7 md:leading-8 text-justify text-sm md:text-base">
                  {" "}
                  {textSlice(reviewText)}{" "}
                </p>
              </div>
            );
          })}
        </div>

        <div className="cursor-pointer ml-2 mr-1">
          <SlArrowRight size={20} onClick={slideRight} />
        </div>
      </div>
    </section>
  );
};

export default FeedbackSlide;
