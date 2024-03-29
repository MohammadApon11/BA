import { MdArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";

export const PrevArrow = ({ className, style, onClick, title }) => {
  return (
    <div
      className="absolute top-[35%] z-[5] bg-gray-700 bg-opacity-30 text-white text-[20px] w-[26px] h-[60px] flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <MdOutlineArrowBackIos />
    </div>
  );
};

export const NextArrow = ({ className, style, onClick, title, classNames }) => {
  return (
    <div
      className="absolute right-0  top-[35%] z-[5]  bg-gray-700 bg-opacity-30 text-white text-[20px] w-[26px] h-[60px] flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <MdArrowForwardIos />
    </div>
  );
};
