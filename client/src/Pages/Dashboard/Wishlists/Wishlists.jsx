import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { CiHeart } from "react-icons/ci";

const Wishlists = () => {
  const [wishlists, setWishlists] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/wishlists/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setWishlists(data));
  }, [user]);
  return (
    <div className="my-12">
      <div className="flex flex-col items-center text-gray-600 mb-10">
        <CiHeart className="text-7xl" />
        <h1 className="text-5xl text-center">My Wishlist</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="text-gray-600">
            <tr>
              <th>Sl</th>
              <th className="font-semibold">Product Name</th>
              <th className="font-semibold">Unite Price</th>
              <th className="font-semibold">Stock Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {wishlists.map((item, index) => (
              <tr key={index} className="text-gray-600 border">
                <td className="border">{index + 1}</td>
                <td className="border">{item?.name}</td>
                <td className="border">Tk{item?.price}</td>
                <td className="border">
                  <div className="border-green-500 border-b-[4px] border-l-[4px] border-t-[1px] border-r-[1px] rounded-md flex items-center justify-center text-green-500 w-[80px] text-[15px]">
                    In Stock
                  </div>
                </td>
                <td className="text-green-500 border ">
                  <button>Add to cart</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wishlists;
