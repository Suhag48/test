//import React utilitize
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

//toastify
import { toast } from "react-toastify";

//import context api file
import myContext from "../../context/myContext";

//react icons
import { BiArrowBack } from "react-icons/bi";

//import axios which helps to fetch data
import axios from "axios";

const ProductDetails = () => {
  const [singleProduct, setSingleProduct] = useState([]);

  const { addToCart } = useContext(myContext);

  const backPrevPage = useNavigate();
  const { productId } = useParams();

  // getting products details
  const getSingleProductDetails = async () => {
    try {
      const res = await axios.get(
        `https://fakestoreapi.in/api/products/${productId}`
      );
      setSingleProduct(res.data.product);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getSingleProductDetails();
  }, []);

  return (
    <section className="px-4 py-16 md:py-20 md:px-16 lg:px-20 mx-auto">
      <button
        onClick={() => backPrevPage("/allproducts")}
        className="flex items-center gap-2 mb-8 mt-16 text-sm font-semibold text-orange-500"
      >
        <BiArrowBack />
        Continue shoppping
      </button>

      <div className="flex flex-col lg:flex-row gap-10 sm:gap-20 lg:gap-0 bg-slate-300 justify-center items-center py-10 px-4 sm:px-12 lg:px-20">
        <div className="flex items-center w-full lg:w-[40%]">
          <img
            src={singleProduct.image}
            alt="single product"
            className=" w-60 h-auto sm:w-64 ] object-center rounded cursor-pointer sm:hover:scale-125 duration-500 mx-auto"
          />
        </div>
        <div className="w-full lg:w-[60%]">
          <p>Brand: {singleProduct.brand}</p>
          <h2 className="text-lg sm:text-xl md:text-2xl font-medium my-4">
            {singleProduct.title}
          </h2>
          <h4 className="font-medium mb-2">
            Discount: ${singleProduct.discount}{" "}
          </h4>
          <p className="leading-7 text-justify">{singleProduct.description}</p>
          <div className="flex items-center mt-6 justify-between">
            <h3 className="text-lg font-medium">
              Price: ${singleProduct.price}
            </h3>
            <button
              onClick={() => addToCart(singleProduct)}
              className="px-3 sm:px-6 py-2 font-medium bg-white rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
