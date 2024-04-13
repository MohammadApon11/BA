import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { CiHeart } from "react-icons/ci";
import useCart from "../../../hooks/PostCartData";
import axios from "axios";
import { useUtilsContext } from "../../../providers/UtilsProviders";
import { RiDeleteBin6Line } from "react-icons/ri";

const Wishlists = () => {
  const [wishlists, setWishlists] = useState([]);
  const { user } = useAuth();
  const { addToCart, error } = useCart();
  const { cartUpdateFlag, updateCart } = useUtilsContext();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/wishlists/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setWishlists(data));
  }, [user, cartUpdateFlag]);

  const handlAddToCart = async (item) => {
    const {
      available_quantity,
      brand,
      image,
      name,
      price,
      productId,
      quantity,
      regularPrice,
      shop,
      userEmail,
    } = item;
    addToCart({
      available_quantity,
      brand,
      image,
      name,
      price,
      productId,
      quantity,
      regularPrice,
      shop,
      userEmail,
    });

    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/wishlists/${item?._id}`
    );
    if (response.data.deletedCount > 0) {
      updateCart();
    }
  };

  const handleDelete = async (deleteItem) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/wishlists/${deleteItem?._id}`
    );
    if (response.data.deletedCount > 0) {
      updateCart();
    }
  };
  return (
    <div className="my-12">
      {wishlists.length > 0 ? (
        <>
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
                  <th></th>
                  <th className="font-semibold">Product Name</th>
                  <th className="font-semibold">Unite Price</th>
                  <th className="font-semibold">Stock Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {wishlists.map((item, index) => (
                  <tr key={index} className="text-gray-600">
                    <td className="">{index + 1}</td>
                    <td>
                      <RiDeleteBin6Line
                        className="text-xl cursor-pointer hover:text-red-500 transition-all duration-200"
                        onClick={() => handleDelete(item)}
                      />
                    </td>
                    <td className="">{item?.name}</td>
                    <td className="">Tk {item?.price}</td>
                    <td className="">
                      <div className="border-green-500 border-b-[4px] border-l-[4px] border-t-[1px] border-r-[1px] rounded-md flex items-center justify-center text-green-500 w-[80px] text-[15px]">
                        In Stock
                      </div>
                    </td>
                    <td className="">
                      <span
                        onClick={() => handlAddToCart(item)}
                        className="cursor-pointer text-white px-3 py-2 text-[15px] bg-green-500 rounded-md "
                      >
                        Add to cart
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h1 className="text-center text-gray-600">No item in wihslists...</h1>
      )}
    </div>
  );
};

export default Wishlists;
