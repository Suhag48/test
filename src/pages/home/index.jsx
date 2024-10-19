import Slide from "../../components/slide/Slide";
import PopularProducts from "../../components/popularProducts/PopularProducts";
import FeedbackSlide from "../../components/feedback/FeedbackSlide";
import Services from "../../components/services/Services";

const Home = () => {
  return (
    <>
      <Slide />
      <PopularProducts />
      <Services />
      <FeedbackSlide />
    </>
  );
};

export default Home;
