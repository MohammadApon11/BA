import { useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import Swal from "sweetalert2";
import { useUtilsContext } from "../providers/UtilsProviders";

const useCart = () => {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [axiosSecure] = useAxiosSecure();
  const { updateCart, cartUpdateFlag } = useUtilsContext();

  const addToCart = async (productData) => {
    try {
      setLoading(true);
      const response = await axiosSecure.put("/cart", productData);
      setCartData(response.data);
      updateCart();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Added to Cart",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setError(error);
      console.log(error);
      if (error.response.data === "Product already added to cart!") {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return { cartData, loading, error, addToCart };
};

export default useCart;
