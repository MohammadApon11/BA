import { useState, useEffect } from "react";
import axios from "axios";

const GetProductsByID = (categoryId) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/${categoryId}`
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Cleanup code if necessary
    };
  }, [categoryId]);

  return { loading, error, products };
};
export default GetProductsByID;
