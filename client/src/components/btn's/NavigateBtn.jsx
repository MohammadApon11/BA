import React from "react";
import { Link } from "react-router-dom";

const NavigateBtn = ({ to, children }) => {
  return (
    <Link to={to} className="bg-pink-500 px-[24px] py-[8px] rounded-[8px]">
      {children}
    </Link>
  );
};

export default NavigateBtn;
