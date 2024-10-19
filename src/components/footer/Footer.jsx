import { Link } from "react-router-dom";

//import payment method logo
import bkash from "../../assets/images/bkash.svg";

const Footer = () => {
  return (
    <footer className="py-16 bg-gray-300 px-4">
      <section className="">
        <div className="flex flex-row gap-8 sm:gap-0 justify-between container mx-auto flex-wrap">
          <div className="hidden sm:flex justify-center items-center">
            <Link to="/" className="text-2xl md:text-3xl font-medium text-gray-800">EasyBuy</Link>
          </div>

          <div className="flex flex-col">
            <h2 className="md:text-lg text-gray-800 font-medium">About EasyBuy</h2>
            <div className="flex flex-col gap-3 mt-5 text-sm md:text-base text-gray-700">
              <Link>Our Story</Link>
              <Link>Team</Link>
              <Link>Privacy Policy</Link>
              <Link>Terms of Use</Link>
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="md:text-lg text-gray-800 font-medium">Category</h2>
            <div className="flex flex-col gap-3 mt-5 text-sm md:text-base text-gray-700">
              <Link to="/contact">Contact Us</Link>
              <Link>FAQ</Link>
            </div>
          </div>

          <div>
            <h2 className="md:text-lg text-gray-800 font-medium">Payment Method</h2>
            <img src={bkash} alt="payment method" className="w-24 h-12 mt-3" />
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
