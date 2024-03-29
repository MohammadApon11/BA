import { useState, useEffect } from "react";
import axios from "axios";

const GetSingleProduct = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/product/${id}`
        );
        setProduct(response.data);
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
  }, [id]);

  return { loading, error, product };
};
export default GetSingleProduct;
