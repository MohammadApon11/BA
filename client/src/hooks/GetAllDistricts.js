import { useEffect, useState } from "react";
import axios from "axios";

const GetAllDistricts = () => {
  const [allDistricts, setAllDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/districts`
        );
        setAllDistricts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching districts:", error);
        setLoading(false);
      }
    };
    fetchData();
    return () => {};
  }, []);

  return { allDistricts, loading };
};

export default GetAllDistricts;
