import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import Foot from "../Pages/Shared/Foot/Foot";
import { AiOutlineHome } from "react-icons/ai";
import { GiSelfLove } from "react-icons/gi";
import { LuShoppingCart } from "react-icons/lu";
import { IoMdAddCircle } from "react-icons/io";
import {
  MdManageAccounts,
  MdManageHistory,
  MdOutlineProductionQuantityLimits,
  MdHistory,
} from "react-icons/md";
import { FaJediOrder } from "react-icons/fa";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const admin = isAdmin?.admin?.admin;
  const shoper = isAdmin?.shoper?.shoper;

  return (
    <div>
      <div className="drawer mb-10">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-base-300 text-gray-200">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2 gap-3">
              <Link className="flex items-center px-2 mx-2 gap-3" to="/">
                <img
                  className="h-10 w-10  rounded-full"
                  src="/white.png"
                  alt=""
                />
                <h1 className="text-xl font-semibold uppercase">BAZAAR</h1>
              </Link>
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                <ul className="flex items-center">
                  <li>
                    <Link className="hover:text-blue-700" to="/">
                      <AiOutlineHome /> Home
                    </Link>
                  </li>
                  {admin && (
                    <>
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "text-blue-600  tracking-wide transition-colors duration-200"
                              : "hover:text-blue-700 "
                          }
                          to="/dashboard/manageProducts"
                        >
                          <MdManageAccounts /> Manage Products
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "text-blue-600  tracking-wide transition-colors duration-200"
                              : "hover:text-blue-700 "
                          }
                          to="/dashboard/manageOrders"
                        >
                          <FaJediOrder /> Manage Orders
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "text-blue-600  tracking-wide transition-colors duration-200"
                              : "hover:text-blue-700 "
                          }
                          to="/dashboard/manageUsers"
                        >
                          <MdManageHistory /> Manage Users
                        </NavLink>
                      </li>
                    </>
                  )}
                  {shoper && (
                    <>
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "text-blue-600  transition-colors duration-200"
                              : "hover:text-blue-700 "
                          }
                          to="/dashboard/addProducts"
                        >
                          <IoMdAddCircle /> Add Products
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "text-blue-600  transition-colors duration-200"
                              : "hover:text-blue-700 "
                          }
                          to="/dashboard/myProducts"
                        >
                          <MdOutlineProductionQuantityLimits /> My Products
                        </NavLink>
                      </li>
                    </>
                  )}
                  {!admin && !shoper && (
                    <>
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "text-blue-600 transition-colors duration-200"
                              : "hover:text-blue-700 "
                          }
                          to="/dashboard/history"
                        >
                          <MdHistory />
                          Payments History
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "text-blue-600  transition-colors duration-200"
                              : "hover:text-blue-700 font-semibold uppercase"
                          }
                          to="/dashboard/wishlists"
                        >
                          <GiSelfLove />
                          Wishlists
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "text-blue-600 transition-colors duration-200"
                              : "hover:text-blue-700"
                          }
                          to="/cart"
                        >
                          <LuShoppingCart />
                          Go to cart
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </ul>
            </div>
          </div>
          {/* Page content here */}
          <div className="bg-gray-50">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-52 h-full bg-base-200">
            {/* Sidebar content here */}
            <li>
              <Link className="hover:text-blue-700" to="/">
                <AiOutlineHome /> Home
              </Link>
            </li>
            {admin ? (
              <>
                {" "}
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600transition-colors duration-200"
                        : "hover:text-blue-700"
                    }
                    to="/dashboard/manageProducts"
                  >
                    <MdManageAccounts /> Manage Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600transition-colors duration-200"
                        : "hover:text-blue-700"
                    }
                    to="/dashboard/manageOrders"
                  >
                    <FaJediOrder /> Manage Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 transition-colors duration-200"
                        : "hover:text-blue-700"
                    }
                    to="/dashboard/manageUsers"
                  >
                    <MdManageHistory /> Manage Users
                  </NavLink>
                </li>
              </>
            ) : shoper ? (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600  transition-colors duration-200"
                        : "hover:text-blue-700"
                    }
                    to="/dashboard/addProducts"
                  >
                    <IoMdAddCircle /> Add Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 transition-colors duration-200"
                        : "hover:text-blue-700"
                    }
                    to="/dashboard/myProducts"
                  >
                    <MdOutlineProductionQuantityLimits /> My Products
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 transition-colors duration-200"
                        : "hover:text-blue-700"
                    }
                    to="/dashboard/history"
                  >
                    <MdHistory />
                    Payments History
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 transition-colors duration-200"
                        : "hover:text-blue-700"
                    }
                    to="/dashboard/wishlists"
                  >
                    <GiSelfLove />
                    Wishlists
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 transition-colors duration-200"
                        : "hover:text-blue-700"
                    }
                    to="/cart"
                  >
                    <LuShoppingCart />
                    Go to cart
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Foot />
    </div>
  );
};

export default Dashboard;
