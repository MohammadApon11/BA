import { useEffect, useState } from "react";
import axios from "axios";

const GetAllUpazilas = () => {
  const [allUpazilas, setAllUpazilas] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/upazilas`
        );
        setAllUpazilas(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching upazilas:", error);
        setLoading(false);
      }
    };
    fetchData();
    return () => {};
  }, []);

  return { allUpazilas, loading };
};

export default GetAllUpazilas;
