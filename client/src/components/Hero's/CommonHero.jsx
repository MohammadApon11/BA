import React from "react";
import hero from "../../../public/hero/commonhero.jpg";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const CommonHero = ({ product, children }) => {
  return (
    <div
      className="flex items-center justify-center py-4 text-[15px] bg-cover bg-center relative h-[20vh]"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="absolute w-full h-full top-0 bg-black opacity-60 z-10"></div>
      <div className="z-20 flex items-center gap-2 text-white">
        <Link to={"/"}>Home</Link>{" "}
        <IoIosArrowForward className="text-gray-400" />
        <Link to={"/products"}>Products</Link>{" "}
        <IoIosArrowForward className="text-gray-400" />
        <Link to={`/products/${product?.categoryId}`}>
          {product?.categoryId}
        </Link>
        <IoIosArrowForward className="text-gray-400" />
        <span className="text-pink-500">{product?.brand}</span>
      </div>
    </div>
  );
};

export default CommonHero;
