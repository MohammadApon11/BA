import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";
import {
  MdSpaceDashboard,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { TiHome } from "react-icons/ti";
import { SiShopee } from "react-icons/si";
import { IoIosLogOut } from "react-icons/io";
import { TbLogin } from "react-icons/tb";
import { IoCreate } from "react-icons/io5";
import SectionWraper from "../../../components/Wrapper's/SectionWraper";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { BsCart4 } from "react-icons/bs";
import GetCartDataByEmail from "../../../hooks/GetCartDataByEmail";

const NavigationBar = () => {
  const { user, logOut } = useAuth();
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch(() => {});
  };
  const [isAdmin] = useAdmin();
  const admin = isAdmin?.admin?.admin;
  const instructor = isAdmin?.instructor?.instructor;

  const navItem = (
    <>
      <li>
        <Link className="text-xl mt-3 lg:hidden block" to={"/"}>
          BAZAAR
        </Link>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-black  transition-colors duration-200"
              : "hover:text-pink-500  text-black"
          }
          to="/"
        >
          <TiHome />
          Home
        </NavLink>
      </li>
      {/* <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-pink-500   transition-colors duration-200"
              : "hover:text-pink-500 text-black  "
          }
          to="/shops"
        >
          <SiShopee /> Shops
        </NavLink>
      </li> */}
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-pink-500   tracking-wide transition-colors  duration-200"
              : "hover:text-pink-500   text-black"
          }
          to="/products"
        >
          <MdOutlineProductionQuantityLimits /> Products
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-pink-500  transition-colors duration-200 "
                : "hover:text-pink-500 text-black "
            }
            to={
              admin
                ? "/Dashboard/manageClasses"
                : instructor
                ? "/dashboard/addClass"
                : "/dashboard/history"
            }
          >
            <MdSpaceDashboard size={20} /> Dashboard
          </NavLink>
        </li>
      )}
      <li>
        {user && (
          <Link
            className=" text-black hover:text-pink-500"
            onClick={handleLogout}
          >
            <IoIosLogOut /> logout
          </Link>
        )}
      </li>
    </>
  );

  const { allCartData } = GetCartDataByEmail(user?.email);

  return (
    <div className="fixed top-0 w-full z-[1000] bg-white">
      <SectionWraper>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown z-10">
              <label
                tabIndex={0}
                className="btn mt-0 btn-ghost text-[40px] lg:hidden"
              >
                <HiOutlineBars3BottomLeft />
              </label>
              <ul
                tabIndex={0}
                className="menu gap-y-6 menu-sm dropdown-content py-4 shadow mobile:w-[300px] w-[250px] h-[400px] bg-slate-200 text-black rounded-box"
              >
                {navItem}
              </ul>
            </div>
            <div className="lg:block hidden">
              <Link to="/" className="flex items-center gap-3">
                <img
                  className="h-10 lg:w-10 w-14 rounded-full"
                  src="https://images.unsplash.com/photo-1552168324-d612d77725e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FtZXJhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                  alt=""
                />
                <p className="normal-case text-black text-xl font-semibold ">
                  BAZAAR
                </p>
              </Link>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItem}</ul>
          </div>
          <div className="navbar-end gap-4">
            <Link to={"/cart"} className="relative cursor-pointer">
              <BsCart4 className="text-[35px] text-black" />
              <div className="bg-pink-500 text-white w-[20px] h-[20px] absolute top-0 -right-1 flex items-center justify-center text-[14px] rounded-[50%]">
                {allCartData?.length}
              </div>
            </Link>
            {user ? (
              <img className="rounded-full h-10" src={user.photoURL} alt="" />
            ) : (
              <>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-pink-500 uppercase font-semibold tracking-wide transition-colors duration-200"
                      : "hover:text-pink-500 uppercase font-semibold"
                  }
                  to="/login"
                >
                  <TbLogin /> Login
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-pink-500 uppercase font-semibold tracking-wide transition-colors duration-200"
                      : "hover:text-pink-500 uppercase font-semibold"
                  }
                  to="/register"
                >
                  <IoCreate /> Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </SectionWraper>
    </div>
  );
};

export default NavigationBar;
