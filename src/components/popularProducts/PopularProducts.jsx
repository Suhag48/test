import { useContext } from "react";
import myContext from "../../context/myContext";
import { Link } from "react-router-dom";

const PopularProducts = () => {
  const context = useContext(myContext);
  const { products, addToCart, loadingMessage } = context;

  //filtering popular products from all products
  const popularProducts = products.filter((item) => item.popular === true);

  return (
    <section className="px-4 py-12 md:py-20 container mx-auto">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-8 md:mb-12 text-center text-gray-800">
        Popular Products
      </h2>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-8">
        {popularProducts.length ? (
          popularProducts.slice(0, 15).map((item, index) => {
            return (
              <div
                key={index}
                className="border-2 shadow-sm rounded bg-[#fafafa] w-36 md:w-52 h-auto py-1"
              >
                <div className="mb-2 overflow-hidden">
                  <Link to={`/productdetails/${item.id}`}>
                    <img
                      src={item.image}
                      alt="product"
                      className="w-auto h-24 md:h-32 rounded cursor-pointer duration-500 mx-auto"
                    />
                  </Link>
                </div>
                <div className="text-sm md:text-base flex flex-col gap-2 p-2 text-gray-700">
                  <h3 className="capitalize">{item.title.slice(0, 22)}</h3>
                  <h4 className="text-gray-700">
                    Discount: {item.discount > 0 ? item.discount : "0"}%
                  </h4>
                  <h4 className="text-gray-700">Price: ${item.price}</h4>
                  <button
                    onClick={() => addToCart(item)}
                    className="rounded bg-slate-400 w-full xsm:w-1/2 text-center py-2 cursor-pointer mt-1 md:mt-2 text-white"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="font-medium md:text-lg text-gray-600">
            {" "}
            {loadingMessage}{" "}
          </p>
        )}
      </div>
    </section>
  );
};

export default PopularProducts;
