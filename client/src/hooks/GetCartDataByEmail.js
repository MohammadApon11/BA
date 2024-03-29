import { useState, useEffect } from "react";
import axios from "axios";
import useAxiosSecure from "./useAxiosSecure";
import { useUtilsContext } from "../providers/UtilsProviders";

const GetCartDataByEmail = (email) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allCartData, setAllCartData] = useState([]);
  const { axiosSecure } = useAxiosSecure();
  const { cartUpdateFlag } = useUtilsContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/cart/${email}`
        );
        setAllCartData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
    return () => {};
  }, [email, cartUpdateFlag]);

  return { loading, error, allCartData };
};
export default GetCartDataByEmail;
