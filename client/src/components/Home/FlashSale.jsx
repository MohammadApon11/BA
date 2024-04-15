import React, { useEffect, useState } from "react";
import SectionWraper from "../Wrapper's/SectionWraper";
import SingleProduct from "../../Pages/products/singleProduct";

const FlashSale = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/flashsale`)
      .then((response) => {
        // Handle the response here
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <SectionWraper>
      <h3 className="text-black text-[24px] mb-[15px]">Flash Sale</h3>
      <div className="mt-4 grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {products?.map((product, index) => (
          <SingleProduct key={index} index={index} product={product} />
        ))}
      </div>
    </SectionWraper>
  );
};

export default FlashSale;
