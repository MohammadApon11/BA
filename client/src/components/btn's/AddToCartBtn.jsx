import React from "react";

const AddToCartBtn = ({ bg = true, children }) => {
  return (
    <button
      className={`rounded-[24px] flex items-center justify-center gap-2 w-[200px] h-[50px] hover:bg-pink-400 ${
        bg ? "bg-pink-500" : " bg-white text-black"
      }`}
    >
      {children}
    </button>
  );
};

export default AddToCartBtn;
