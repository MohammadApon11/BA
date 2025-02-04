import React, { useEffect, useState } from "react";
import SectionWraper from "../Wrapper's/SectionWraper";
import OneProduct from "../../Pages/products/OneProduct";

const ForYou = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/foryou`)
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
      <h3 className="text-black text-[24px] mb-[15px]">Just for you!</h3>
      <div className="mt-4 grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {products?.map((product, index) => (
          <OneProduct key={index} index={index} product={product} />
        ))}
      </div>
    </SectionWraper>
  );
};

export default ForYou;
