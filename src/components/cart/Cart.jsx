// import react and context api utilitize
import { useContext, useState } from "react";
import myContext from "../../context/myContext";

const Cart = () => {
  const [promoCode, setPromoCode] = useState("");
  const [couponMessage, setCouponMessage] = useState(
    "use a promo code to get 10% discount!"
  );

  const {
    cart,
    handleIncrement,
    handleDecrement,
    handleRemove,
    getTotalPrice,
    setDiscount,
  } = useContext(myContext);

  // PromoCode
  const handlePromoCode = () => {
    if (promoCode === "suhag") {
      setDiscount(getTotalPrice() * 0.1);
      setPromoCode("");
      setCouponMessage("wow! you got 10% discount!");
    } else {
      setCouponMessage("invalid PromoCode!");
    }
  };

  return (
    <>
      <div className="grid sm:grid-cols-4 jusitfy-center gap-8 sm:gap-0">
        <div className="sm:col-span-3 bg-gray-300 py-8 px-2 lg:h-[700px]">
          <div className="flex justify-between text-slate-600 pb-8 px-6 text-lg sm:text-2xl font-medium">
            <h2>Shopping Cart</h2>
            <h2>{cart.length} items</h2>
          </div>
          <hr className="h-[1px] bg-slate-800 mx-6 " />
          <div className="grid grid-cols-2 px-4 pt-8 uppercase mb-4 text-slate-600 text-sm sm:text-base">
            <div className="font-medium">
              <h3>product details</h3>
            </div>
            <div className="flex justify-evenly font-medium">
              <h3>Quantity</h3>
              <h3>Price</h3>
              <h3>Total</h3>
            </div>
          </div>
          {cart.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-gray-200 text-slate-800 grid grid-cols-2 p-4 rounded-sm mt-2 items-center"
              >
                <div className="flex gap-8 items-center">
                  <img
                    src={item.image}
                    alt="cart image"
                    className="w-14 h-10 sm:w-20 sm:h-16"
                  />

                  <div className="">
                    <h4 className="mb-2">
                      {item.title.slice(0, 25) + "..."}
                    </h4>
                    <p className=" text-orange-700 text-sm sm:text-base ">
                      {item.category}
                    </p>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-sm sm:text-sm mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex justify-evenly text-sm sm:text-base">
                  <span className="">
                    <button
                      onClick={() => handleDecrement(item.id)}
                      className="mr-4"
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      onClick={() => handleIncrement(item.id)}
                      className="ml-4"
                    >
                      +
                    </button>
                  </span>
                  <p> ${item.price} </p>
                  <p>${item.price * item.quantity}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-gray-300 py-8 px-2 lg:px-6 text-slate-600 border-x border-white shadow-lg">
          <h1 className="text-lg sm:text-2xl">Order Summery</h1>
          <hr className="h-[1px] bg-slate-900 mx-6 my-4 sm:my-8" />
          <div className="flex justify-between font-medium mb-6 text-sm sm:text-base">
            <h3>{cart.length} items</h3>
            <h3>${getTotalPrice()}</h3>
          </div>
          <div>
            <h2 className="font-normal uppercase mb-2 text-sm sm:text-base">
              Shipping
            </h2>
            <select
              name="shipping"
              id="shipping"
              className="w-full p-2 text-slate-500 border-sm bg-white cursor-pointer font-light text-sm sm:text-base focus:outline-emerald-300 focus:outline-1"
            >
              <option className="cursor-pointer py-2">
                Standard shipping - 10.00$
              </option>
            </select>
          </div>
          <div className="py-6 sm:py-8">
            <h2 className="font-normal uppercase text-sm sm:text-base">
              Promo Code
            </h2>
            <input
              type="text"
              placeholder="Enter your code"
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full p-2 mt-2 mb-2 bg-white  text-sm sm:text-base focus:outline-emerald-300 focus:outline-1 focus:border-none"
            />
            <p
              className={`${
                couponMessage.includes("wow!")
                  ? "text-green-600 ml-1 text-sm"
                  : "text-orange-700 ml-1 text-sm"
              }`}
            >
              {couponMessage}
            </p>
            <button
              onClick={handlePromoCode}
              className="bg-gray-400 text-gray-800 px-6 py-2 mt-5 rounded-sm text-sm sm:text-base mx-auto w-full"
            >
              Apply
            </button>
          </div>
          <div className="flex justify-between mt-4 text-sm sm:text-base">
            <h2 className="uppercase text-gray-800">Total cost</h2>
            <h2 className="text-gray-800">${getTotalPrice() + 10}</h2>
          </div>
          <button className="mt-10 bg-gray-400 text-gray-800 w-full py-2 rounded-sm text-sm sm:text-base">
            Order Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
