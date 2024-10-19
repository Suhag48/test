//import images
import about_us from "../../assets/about/img3.jpg";
import vision from "../../assets/images/img2.png";
import story from "../../assets//images//story.jpg"

const About = () => {
  // reducing big text based on Condition
  const textSlice = (text) => {
    if (text.length > 400) {
      return text.slice(0, 400);
    }
    else{
      return text;
    }
  };
  return (
    <section className="px-4 py-12 md:py-16 container mx-auto text-gray-700">
      <div className=" flex flex-col gap-16 lg:gap-16 mt-20">
        <div className="grid lg:grid-cols-2 gap-6 min-h-[340px] w-full">
          <div>
            <img src={about_us} alt="aboutImg" className="w-full h-full" />
          </div>
          <div className="border px-4 py-8 shadow-lg w-full">
            <h2 className="text-xl md:text-2xl font-medium text-center mb-4">
              Who We are?{" "}
            </h2>
            <p className="text-justify leading-7 md:leading-8 text-sm md:text-base">
              {textSlice(
                "We are more than just an eCommerce platform—we’re a team of passionate individuals dedicated to revolutionizing the online shopping experience. Founded on the belief that shopping should be easy, accessible, and enjoyable for everyone, we set out to create a marketplace that brings value, quality, and convenience to our customers' fingertips."
              )}

              {/* <button className="font-medium ml-2">
                see more...
              </button> */}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 min-h-[340px] w-full" id="story">
          <div className="lg:order-2">
            <img src={story} alt="aboutImg" className="w-full h-full" />
          </div>
          <div className="border px-4 py-8 shadow-lg w-full">
            <h2 className="text-xl md:text-2xl font-medium text-center mb-4">
              Our Story{" "}
            </h2>
            <p className="text-justify leading-7 md:leading-8 text-sm md:text-base">
              {textSlice(
                "What began as a vision to simplify the way people shop has grown into a thriving community of happy customers and dedicated partners. From our humble beginnings, EasyBuy has evolved into a trusted platform that caters to diverse shopping needs. Our journey is driven by our commitment to creating a place where customers can effortlessly explore a wide range of products and brands, all in one place."
              )}

              {/* <button className="font-medium ml-2">
                see more...
              </button> */}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 min-h-[340px] w-full">
          <div>
            <img src={vision} alt="missionImg" className="w-full h-full" />
          </div>
          <div className="border px-4 py-8 shadow-lg w-full">
            <h2 className="text-xl md:text-2xl font-medium text-center mb-4">
              Our Vission{" "}
            </h2>
            <p className="text-justify leading-7 md:leading-8 text-sm md:text-base">
              {textSlice(
                "At EasyBuy, our vision is to create a world where online shopping is not just a transaction, but a delightful experience that brings joy, convenience, and trust to every customer. We aspire to be the go-to platform for people seeking quality products, exceptional service, and a seamless shopping journey—every single time they visit us."
              )}

              {/* <button className="font-medium ml-2">
                see more...
              </button> */}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
