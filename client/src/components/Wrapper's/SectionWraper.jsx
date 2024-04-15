import React from "react";

const SectionWraper = ({ children }) => {
  return (
    <div className="lg:max-w-[1200px] lg:max-xl:px-6 xxs:max-lg:px-4 mx-auto">
      {children}
    </div>
  );
};

export default SectionWraper;
