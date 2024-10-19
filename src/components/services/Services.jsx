import { FaShippingFast } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";
import { MdProductionQuantityLimits } from "react-icons/md";

const Services = () => {
  return (
    <>
      <section className="px-4 py-4 md:py-8 container mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl mb-8 md:mb-12 text-center text-gray-800 font-medium">
          Our Services
        </h2>
        <div className="flex flex-wrap justify-center gap-x-6 md:gap-x-8 lg:gap-x-10 gap-y-8 text-gray-800">
          <div className="bg-slate-300 w-36 h-32 sm:w-44 sm:h-40 md:w-52 md:h-48 lg:w-64 lg:h-56 rounded-sm text-center flex flex-col justify-center gap-4 md:gap-8 items-center cursor-pointer hover:scale-95 transition-all duration-500">
            <FaShippingFast size={36} />
            <p className="text-sm md:text-base">FREE SHIPPING</p>
          </div>

          <div className="bg-slate-300 w-36 h-32 sm:w-44 sm:h-40 md:w-52 md:h-48 lg:w-64 lg:h-56 rounded-sm text-center flex flex-col justify-center gap-4 md:gap-8 items-center cursor-pointer hover:scale-95 transition-all duration-500">
            <MdProductionQuantityLimits size={36} />
            <p className="text-sm md:text-base px-1">AUTHENTIC PRODUCT</p>
          </div>

          <div className="bg-slate-300 w-36 h-32 sm:w-44 sm:h-40 md:w-52 md:h-48 lg:w-64 lg:h-56 rounded-sm text-center flex flex-col justify-center gap-4 md:gap-8 items-center cursor-pointer hover:scale-95 transition-all duration-500">
            <TbTruckReturn size={36} />
            <p className="text-sm md:text-base">EASY RETURN</p>
          </div>

          <div className="bg-slate-300 w-36 h-32 sm:w-44 sm:h-40 md:w-52 md:h-48 lg:w-64 lg:h-56 rounded-sm text-center flex flex-col justify-center gap-4 md:gap-8 items-center cursor-pointer hover:scale-95 transition-all duration-500">
            <MdOutlinePayment size={36} />
            <p className="text-sm md:text-base">SECURE PAYMENT</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
