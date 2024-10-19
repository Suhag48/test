// import react utility
import { NavLink, Outlet } from "react-router-dom";

// import context api utilitize
import { useContext } from "react";
import myContext from "../../context/myContext";

//import react icons
import { IoMdLogOut } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { MdProductionQuantityLimits } from "react-icons/md";
import { MdDashboard } from "react-icons/md";

const UserDashboard = () => {
  const { logout } = useContext(myContext);

  // style for active link
  const activeLink = "text-green-800 flex gap-2 items-center text-lg";

  return (
    <section className="px-4 py-12 md:py-16 md:px-4 lg:px-12 flex flex-col md:flex-row gap-2 lg:gap-4 h-auto">
      <div className="mx-auto w-full flex flex-col items-center mt-20 md:w-1/4 h-full">
        <nav className=" bg-gray-300 p-8 md:h-[500px] w-full h-auto flex flex-col items-center md:items-start text-gray-700 font-medium">
          <div className="flex gap-2 mb-12 items-center text-xl">
            <MdDashboard className="md:hidden lg:block" />
            <h2>Admin Dashboard</h2>
          </div>
          <ul className="flex flex-col gap-8">
            <NavLink
              to="/adminDashboard/products"
              className={({ isActive }) =>
                isActive ? activeLink : "flex gap-2 items-center text-lg"
              }
            >
              <MdProductionQuantityLimits />
              <p>Products</p>
            </NavLink>

            <NavLink
              to="/adminDashboard/users"
              className={({ isActive }) =>
                isActive ? activeLink : "flex gap-2 items-center text-lg"
              }
            >
              <FaUser size={16} />
              <p>Users</p>
            </NavLink>

            <NavLink
              to="/adminDashboard/messages"
              className={({ isActive }) =>
                isActive ? activeLink : "flex gap-2 items-center text-lg"
              }
            >
              <FaRegMessage size={16} />
              <p>Messages</p>
            </NavLink>

            <div className="w-full md:mt-36">
              <button onClick={logout} className="flex items-center gap-2">
                <IoMdLogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </ul>
        </nav>
      </div>
      <div className="w-full overflow-y-scroll no-scrollbar h-full mt-8 md:mt-20 md:h-[500px]">
        <Outlet />
      </div>
    </section>
  );
};

export default UserDashboard;
