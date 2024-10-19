//import react utilitize
import { NavLink, Outlet } from "react-router-dom";

//import context api utilitize
import { useContext } from "react";
import myContext from "../../context/myContext";

//import react icons
import { IoMdLogOut } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";

const UserDashboard = () => {
  const { logout, cart } = useContext(myContext);

  // style for active link
  const activeLink = "text-green-800 flex gap-2 items-center text-lg";

  return (
    <section className="px-4 py-12 md:py-16 md:px-4 lg:px-16 flex flex-col md:flex-row gap-2 lg:gap-4 h-auto">
      <div className="mx-auto w-full flex flex-col items-center mt-20 md:w-1/4 h-full">
        <nav className=" bg-slate-300 text-gray-700 p-8 md:h-[500px] w-full h-auto flex flex-col items-center md:items-start">
          <div className="flex gap-2 mb-12 items-center text-xl font-medium">
            <MdDashboard />
            <h2>Dashboard</h2>
          </div>
          <ul className="flex flex-col gap-8">
            <NavLink
              to="/userdashboard/cart"
              className={({ isActive }) =>
                isActive ? activeLink : "flex gap-2 items-center text-lg font-medium"
              }
            >
              <FaCartShopping />
              <span>Cart</span>
              <span className="text-green-700 mt-[-14px] ml-[-4px]">
                {cart.length}
              </span>
            </NavLink>
            <div className="md:mt-72 w-full">
              <button onClick={logout} className="flex gap-2 items-center font-medium">
                <IoMdLogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </ul>
        </nav>
      </div>
      <div className="w-full overflow-y-scroll no-scrollbar mt-4 md:mt-20 md:h-[500px]">
        <Outlet />
      </div>
    </section>
  );
};

export default UserDashboard;
