import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import myContext from "../../context/myContext";

// import icons
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const context = useContext(myContext);
  const { isClick, setIsClick } = context;

  //getting user from local storage
  const user = JSON.parse(localStorage.getItem("user"));

  // style for active link
  const activeLink = "text-green-500";

  return (
    <header className="flex justify-between items-center h-20 bg-slate-100 fixed z-10 w-full px-3 md:px-4 lg:px-16 border-b shadow-md text-gray-700">
      <div>
        <Link to="/" className="text-xl md:text-2xl lg:text-3xl font-medium text-green-500">
          EasyBuy
        </Link>
      </div>

      {/* menu for mobile code start */}
      <div className="cursor-pointer block sm:hidden">
        {isClick ? (
          <FaTimes size={22} onClick={() => setIsClick(!isClick)} />
        ) : (
          <GiHamburgerMenu size={22} onClick={() => setIsClick(!isClick)} />
        )}
      </div>
      <div
        className={`flex flex-col justify-between bg-slate-300 py-14 z-20 top-20 absolute w-full transition-all duration-500 ease-in-out left-[-100vw] ${
          isClick ? "left-[0] block sm:hidden" : ""
        }`}
      >
        <nav className="flex flex-col items-center font-medium gap-8 text-xl lg:text-2xl">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeLink : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/allproducts"
            className={({ isActive }) => (isActive ? activeLink : "")}
          >
            All Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? activeLink : "")}
          >
            About Us
          </NavLink>
          {user && user.email != "suhagrana.q@gmail.com" ? (
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? activeLink : "")}
            >
              Contact Us
            </NavLink>
          ) : (
            ""
          )}
        </nav>

        <div className="sm:hidden mt-12">
          {user ? (
            <div className=" flex flex-col justify-center md:mt-0 gap-4 lg:gap-8 items-center text-xl md:text-2xl">
              <div onClick={() => setShow(!show)} className="">
                {user.email !== "suhagrana.q@gmail.com" ? (
                  <div className="flex flex-col gap-6">
                    <div className="flex gap-2">
                      <h2>Hi,</h2>
                      <Link
                        to="/userDashboard/cart"
                        className="text-sm mt-[5px] flex items-center"
                      >
                        <p>{user.displayName}</p>
                        <IoMdArrowDropdown />{" "}
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    <div className="flex gap-1">
                      <h2 className="font-medium">Hi,</h2>
                      <p className="text-sm mt-[6px]">{user.displayName}</p>
                    </div>
                    <Link to="/admindashboard/products" className="text-lg font-medium">
                      Admin Panel
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-5">
              <Link
                to="/register"
                className="text-lg bg-slate-400 hover:bg-slate-500 hover:text-white transition-all duration-300 rounded px-3 lg:px-5 py-1 text-center w-24"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="text-lg bg-slate-400 hover:bg-slate-500 hover:text-white transition-all duration-300 rounded px-3 lg:px-5 py-1 text-center w-24"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* menu for mobile code end */}

      {/* menu code for desktop start */}
      <div className="text-xl lg:text-2xl hidden sm:block">
        <nav className="flex font-medium gap-4 lg:gap-8">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeLink : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/allproducts"
            className={({ isActive }) => (isActive ? activeLink : "")}
          >
            All Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? activeLink : "")}
          >
            About
          </NavLink>
          {user && user.email != "suhagrana.q@gmail.com" ? (
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? activeLink : "")}
            >
              Contact
            </NavLink>
          ) : (
            ""
          )}
        </nav>
      </div>

      <div className="hidden sm:block">
        {user ? (
          <div className="flex justify-center md:mt-0 gap-4 lg:gap-8 items-center text-lg lg:text-xl">
            <span className="flex items-center gap-1 lg:gap-2">
            <h2 className="font-medium">Hi,</h2>
              <span
                onClick={() => setShow(!show)}
                className="text-base font-normal cursor-pointer"
              >
                {user.email !== "suhagrana.q@gmail.com" ? (
                  <>
                    <span className="flex items-center">
                      <Link to="/userDashboard/cart">{user.displayName}</Link>
                      <IoMdArrowDropdown />
                    </span>
                  </>
                ) : (
                  <>
                    {user.displayName}
                    <NavLink
                      to="/admindashboard/products"
                      className="text-lg lg:text-xl ml-2 lg:ml-6 font-medium"
                    >
                      Admin Panel
                    </NavLink>
                  </>
                )}
              </span>
            </span>
          </div>
        ) : (
          <>
            <NavLink
              to="/register"
              className="text-lg bg-slate-300 hover:bg-slate-400 transition-all duration-300 rounded px-3 lg:px-5 py-1"
            >
              Register
            </NavLink>
            <NavLink
              to="/login"
              className="ml-4 text-lg bg-slate-300 hover:bg-slate-400 transition-all duration-300 rounded px-3 lg:px-5 py-1"
            >
              Login
            </NavLink>
          </>
        )}
      </div>

      {/* menu code for desktop end */}
    </header>
  );
};

export default Navbar;
