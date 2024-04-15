import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const SingleProduct = ({ product, index }) => {
  const { name, image, description, ratings, sells, price, _id } = product;
  const freeDelivery = true;

  return (
    <Link
      to={`/product/${_id}`}
      className={`border-l border-r p-[20px] group hover:shadow-lg text-gray-600`}
    >
      <div className="md:max-w-[250px] md:h-[160px] mx-auto overflow-hidden rounded-2xl">
        <img
          className="w-full h-full  group-hover:scale-125 transition-all duration-300"
          src={image}
          alt={name}
        />
      </div>
      <h5 className="md:mt-[40px] mt-[25px] md:text-[24px] text-[22px]">
        {name}
      </h5>
      <p className="text-[15px] group-hover:text-[#108ee9]">
        {description.substring(0, 34)}...
      </p>
      <div className="flex items-center mt-[10px] gap-[3px] text-[14px] text-gray-400">
        <FaStar className="text-[#ffde37]" />
        <span>
          {ratings}/5 (4) • {sells} sold
        </span>
      </div>
      {freeDelivery && (
        <div className="border border-[#007787] text-[#007787] text-[10px]  rounded-[3px] w-[72px] text-center my-[5px]">
          Free Delivery
        </div>
      )}
      <p>
        <span className="text-pink-500 font-semibold"> Tk {price}</span>{" "}
        <del className="text-[13px] text-gray-400">Tk {price + 20}</del>
      </p>
    </Link>
  );
};
export default SingleProduct;
