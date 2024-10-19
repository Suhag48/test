//import react utilitize
import { useContext } from "react";

//import context api file
import myContext from "../../../context/myContext";

// import component
import CartEmpty from "../../../components/cart/CartEmpty";
import UserCart from "../../../components/cart/Cart";

const Cart = () => {
  const { cart } = useContext(myContext);
  return <>{!cart.length ? <CartEmpty /> : <UserCart />}</>;
};

export default Cart;
