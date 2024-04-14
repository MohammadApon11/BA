import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionWraper from "../../../../components/Wrapper's/SectionWraper";

const ManageProducts = () => {
  const [refresh, setRefresh] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/allproducts`)
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  }, [refresh]);

  const [axiosSecure] = useAxiosSecure();

  // updated status
  const handleStatus = (id, status) => {
    axiosSecure.put(`/productsStatus/${id}`, { status }).then((res) => {
      if (res.data.modifiedCount > 0) {
        setRefresh(!refresh);
        Swal.fire("Good job!", "Status Updated!", "success");
      }
    });
  };
  return (
    <SectionWraper>
      <h1 className="text-4xl text-center font-semibold mt-20 mb-10 text-gray-600">
        Manage Products
      </h1>
      <div className="overflow-x-auto text-gray-600">
        <table className="table">
          {/* head */}
          <thead className="bg-gray-200 py-3 ">
            <tr className="text-gray-600 rounded-tr-md rounded-tl-md">
              <th>SL</th>
              <th>Image</th>
              <th>Name</th>
              <th>Shop</th>
              <th>Shop Email</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={product?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{product?.name}</td>
                <td>{product?.shop}</td>
                <td>{product?.shopEmail}</td>
                <td>{product?.available_quantity}</td>
                <td>${product?.price}</td>
                <td
                  className={`font-semibold ${
                    product?.status === "approved"
                      ? "text-success"
                      : "text-red-600"
                  }`}
                >
                  {product?.status}
                </td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleStatus(product?._id, "approved")}
                    className={`${
                      product?.status === "approved" ||
                      product?.status === "denied"
                        ? "btn btn-disabled text-gray-400 btn-xs"
                        : "btn btn-primary btn-xs"
                    }`}
                  >
                    approve
                  </button>

                  <button
                    onClick={() => handleStatus(product?._id, "denied")}
                    className={`${
                      product?.status === "approved" ||
                      product?.status === "denied"
                        ? "btn btn-disabled text-gray-400 btn-xs"
                        : "btn btn-error bg-red-600 btn-xs text-white"
                    }`}
                  >
                    Deny
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionWraper>
  );
};

export default ManageProducts;
