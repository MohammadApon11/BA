import { Link } from "react-router-dom";

const Categories = ({ category, index }) => {
  const { image, name, categoryId } = category;
  return (
    <Link
      to={`products/${categoryId}`}
      className={`group hover:shadow-lg p-[15px] ${index <= 6 && "border-b xxs:max-xl:border-r"} ${
        index === 6 ? "" : "border-r"
      } ${index === 13 ? "lg:border-r-none" : ""} xxs:max-xl:border-b`}
    >
      <img
        className="mx-auto w-[140px] h-[90px] cursor-pointer rounded-[5px]"
        src={image}
        alt=""
      />
      <h3 className="mt-[12px] text-center text-black">{name}</h3>
    </Link>
  );
};

export default Categories;
