import React from "react";
import NavFixedGap from "../../components/gap's/NavFixedGap";
import { Link, useLocation, useParams } from "react-router-dom";
import GetProductsByID from "../../hooks/GetProductsByID";
import SectionWraper from "../../components/Wrapper's/SectionWraper";
import Divider from "../../components/divider's/Divider";
import useCategories from "../../hooks/GetAllCategories";
import GetAllProducts from "../../hooks/GetAllProducts";
import { FaStar } from "react-icons/fa";
import SectionGap from "../../components/gap's/SectionGap";
import { FiDollarSign } from "react-icons/fi";
import { IoLogoAndroid } from "react-icons/io";
import {
  FaTruckMoving,
  FaPhone,
  FaApple,
  FaShoppingBasket,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { UseScrollTop } from "../../hooks/useScrollTop";
import OneProduct from "./OneProduct";

const footerData = [
  {
    icon: <FaTruckMoving />,
    title1: "FREE SHIPPING ON",
    title2: "ORDER OVER $99",
  },
  {
    icon: <FaPhone />,
    title1: "HAVE A QUESTIONS?",
    title2: "+10800 789 0000",
  },
  {
    icon: <FiDollarSign />,
    title1: "100% MONEY BACK",
    title2: "GUARANTEE",
  },
  {
    icon: <FaShoppingBasket />,
    title1: "30 DAYS RETURN",
    title2: "SERVICE",
  },
  {
    icon: "",
    icon1: <FaApple />,
    icon2: <IoLogoAndroid />,
    title1: "",
    title2: "",
    title3: "DOWNLOAD",
  },
];

const Products = () => {
  const { categoryId } = useParams();
  const { loading, error, products } = GetProductsByID(categoryId);
  const { allProducts } = GetAllProducts();
  const { categories } = useCategories();

  const topRatedProducts = allProducts.filter(
    (product) => product.ratings === 5
  );
  const notify = () =>
    toast("Feature Coming Soon!", {
      icon: "⚠️",
    });
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <SectionWraper>
      <UseScrollTop />
      <NavFixedGap />
      <div className="grid grid-cols-12 gap-x-4 md:mt-[40px] mt-[20px]">
        <div className="lg:col-span-3 md:col-span-4 md:block hidden">
          <h4 className="text-[20px] text-black border-l-[3px] border-l-pink-500 pl-4 py-[14px] border font-semibold ">
            PRODUCT CATEGORIES
          </h4>
          <div className="flex flex-col text-black border-l border-r">
            {categories.map((category, index) => (
              <Link
                className="py-[11px] border-b pl-4 uppercase text-[15px]"
                to={`/products/${category?.categoryId}`}
                key={index}
              >
                {category.name}
              </Link>
            ))}
          </div>
          <h4 className="mt-[30px] text-[20px] text-black border-l-[3px] border-l-pink-500 pl-4 py-[14px] border font-semibold ">
            TOP RATED PRODUCTS
          </h4>
          <div className="flex flex-col text-black border-l border-r">
            {topRatedProducts.map((product, index) => (
              <div
                className="flex  gap-3 py-3 border-b pl-4"
                to={""}
                key={index}
              >
                <Link to={`/product/${product?._id}`}>
                  <img
                    className="border w-[100px] h-[70px]"
                    src={product?.image}
                    alt={product?.name}
                  />
                </Link>
                <div className="flex flex-col gap-1">
                  <p className="text-[13px] text-gray-400">
                    {product?.name.substring(0, 15)}
                  </p>
                  <div className="flex items-center gap-[2px]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar
                        className="text-[#ffde37] text-[14px]"
                        key={index}
                      />
                    ))}
                  </div>
                  <p>
                    <span className="text-pink-500 text-[14px] font-semibold">
                      {" "}
                      Tk {product?.price}
                    </span>{" "}
                    <del className="text-[12px] text-gray-400">
                      Tk {product?.price + 20}
                    </del>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-9 md:col-span-8 col-span-12">
          {pathname === "/products" ? (
            <h1 className="text-gray-600">All products here</h1>
          ) : (
            <p className="text-black">
              {products.length} Items found for{" "}
              <span className="text-pink-500">
                "
                {categoryId === "officesupplies"
                  ? categoryId.split("su").join(" su").charAt(0).toUpperCase() +
                    categoryId.split("su").join(" su").slice(1)
                  : categoryId.split("&").join(" & ").charAt(0).toUpperCase() +
                    categoryId.split("&").join(" & ").slice(1)}
                "
              </span>
            </p>
          )}
          <Divider />
          <div className="grid lg:grid-cols-3 md:grid-cols-2 mobile:grid-cols-2 grid-cols-1 border-t border-b text-black">
            {pathname === "/products"
              ? allProducts.map((product, index) => (
                  <OneProduct product={product} index={index} key={index} />
                ))
              : products.map((product, index) => (
                  <OneProduct product={product} index={index} key={index} />
                ))}
          </div>
        </div>
      </div>
      <SectionGap />
      <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 shadow-md border">
        {footerData?.map((item, index) => (
          <div
            className={`border lg:p-[24px] xxs:p-[10px] text-black uppercase text-[15px] font-semibold ${
              index === 4 && "bg-pink-500 flex flex-col justify-center"
            }`}
            key={index}
          >
            {index <= 3 && (
              <>
                {" "}
                <div className="w-[60px] mx-auto h-[60px] rounded-[50%] border-dotted border-[2px] flex items-center justify-center text-pink-500 border-pink-500 text-[20px]">
                  {item?.icon}
                </div>
                <p className="mt-[20px] text-center">{item?.title1}</p>
                <p className="text-center">{item?.title2}</p>
              </>
            )}
            {index === 4 && (
              <>
                <div
                  onClick={() => notify()}
                  className="flex items-center justify-center lg:gap-2 gap-[4px] bg-white rounded-[26px] lg:py-3 py-2  cursor-pointer text-[15px] xxs:max-mobile:text-[12px]"
                >
                  <span className="text-pink-500 lg:text-[23px] text-[20px]">
                    {item?.icon1}
                  </span>{" "}
                  {item?.title3}
                </div>
                <div
                  onClick={() => notify()}
                  className="flex items-center justify-center lg:gap-2 gap-1 bg-white rounded-[26px] lg:py-3 py-2 cursor-pointer mt-2 text-[15px] xxs:max-mobile:text-[12px]"
                >
                  <span className="text-pink-500 lg:text-[23px] text-[20px]">
                    {item?.icon2}
                  </span>{" "}
                  {item?.title3}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <Toaster />
      <SectionGap />
    </SectionWraper>
  );
};

export default Products;
