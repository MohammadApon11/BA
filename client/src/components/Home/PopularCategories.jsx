import SectionWraper from "../Wrapper's/SectionWraper";
import Categories from "./Categories";
import useCategories from "../../hooks/GetAllCategories";

const PopularCategories = () => {
  const { categories, loading } = useCategories();

  return (
    <SectionWraper>
      <h3 className="text-black text-[24px] mb-[15px]">
        {" "}
        Explore Popular Categories
      </h3>
      <div className="grid xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 mobile:grid-cols-3 xxs:grid-cols-2 border">
        {categories.map((category, index) => (
          <Categories
            key={index}
            category={category}
            index={index}
          ></Categories>
        ))}
      </div>
    </SectionWraper>
  );
};

export default PopularCategories;
