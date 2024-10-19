//import packages
import { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import react toastify and toastify css
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import css file
import "./App.css";

//import axios
import axios from "axios";

//import context api state component
import MyContext from "./context/myContext";

//import pages (use dynamic imports)
const Home = lazy(() => import("./pages/home"));
const AllProducts = lazy(() => import("./pages/allproducts"));
const About = lazy(() => import("./pages/about"));
const Contact = lazy(() => import("./pages/contact"));
const Register = lazy(() => import("./pages/register"));
const Login = lazy(() => import("./pages/login"));
const NoPage = lazy(() => import("./pages/nopage"));
const AdminDashboard = lazy(() => import("./pages/adminDashboard"));
const Users = lazy(() => import("./pages/adminDashboard/users"));
const ShowProducts = lazy(() => import("./pages/adminDashboard/products"));
const Message = lazy(() => import("./pages/adminDashboard/message"));
const EditProduct = lazy(() => import("./pages/adminDashboard/editProduct"));
const UserDashboard = lazy(() => import("./pages/userDashboard"));
const Cart = lazy(() => import("./pages/userDashboard/cart"));
const ProductDetails = lazy(() => import("./pages/productDetails"));

// import header and footer component
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

// protected component
import ProtectedAdmin from "./components/protected/Admin";
import ProtectedUser from "./components//protected//User";

const App = () => {
  const [isClick, setIsClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Fetching Data!");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);

  //getting popular products from api
  const gettingProducts = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.in/api/products");
      setProducts(res.data.products);
    } catch (error) {
      toast.error("Failed to fetch products!", error.message);
    }
  };

  useEffect(() => {
    gettingProducts();
  }, []);

  // delete Product
  const deleteProduct = (id) => {
    try {
      const remainProducts = products.filter((item) => item.id !== id);
      setProducts(remainProducts);
      toast.success("product deleted successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // add to cart functionality
  const addToCart = (product) => {
    try {
      setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === product.id);
        if (existingProduct) {
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevCart, { ...product, quantity: 1 }];
        }
      });
      toast.success("product added to the cart!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  //increase quantity
  const handleIncrement = (id) => {
    const increaseQuantity = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(increaseQuantity);
  };

  //decrease quantity
  const handleDecrement = (id) => {
    const decreaseQuantity = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(decreaseQuantity);
  };

  //remove item
  const handleRemove = (id) => {
    try {
      const updateCartFilter = cart.filter((item) => item.id !== id);
      setCart(updateCartFilter);
      toast.success("removed product!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  //calculate total price
  const getTotalPrice = () => {
    const totalPrice = cart.reduce((total, cartReduceItem) => {
      return total + cartReduceItem.price * cartReduceItem.quantity;
    }, 0);
    return totalPrice - (discount || 0);
  };

  // logout functionality
  const logout = () => {
    try {
      localStorage.removeItem("user");
      toast.success("Logout Successful!", {
        autoClose: 2000,
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <BrowserRouter>
      <MyContext.Provider
        value={{
          isClick,
          setIsClick,
          loading,
          setLoading,
          loadingMessage,
          setLoadingMessage,
          products,
          deleteProduct,
          addToCart,
          cart,
          handleIncrement,
          handleDecrement,
          handleRemove,
          getTotalPrice,
          discount,
          setDiscount,
          logout,
        }}
      >
        <Navbar />
        <Suspense fallback={<div className="flex justify-center items-center text-2xl pt-32 min-h-screen">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allproducts" element={<AllProducts />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NoPage />} />
            <Route
              path="/productdetails/:productId"
              element={<ProductDetails />}
            />
            <Route
              path="/editProduct/:productId"
              element={
                <ProtectedAdmin>
                  <EditProduct />
                </ProtectedAdmin>
              }
            />
            {/* routing for admin start */}
            <Route
              path="/adminDashboard"
              element={
                <ProtectedAdmin>
                  <AdminDashboard />
                </ProtectedAdmin>
              }
            >
              <Route path="products" element={<ShowProducts />} />
              <Route path="users" element={<Users />} />
              <Route path="messages" element={<Message />} />
            </Route>
            {/* routing for admin end */}

            {/* routing for user start */}
            <Route
              path="/userDashboard"
              element={
                <ProtectedUser>
                  <UserDashboard />
                </ProtectedUser>
              }
            >
              <Route path="cart" element={<Cart />} />
            </Route>
            {/* routing for user end */}
          </Routes>
        </Suspense>
        <ToastContainer />
        <Footer />
      </MyContext.Provider>
    </BrowserRouter>
  );
};

export default App;
