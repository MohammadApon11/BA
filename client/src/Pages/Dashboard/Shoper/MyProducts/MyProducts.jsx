import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const MyProducts = () => {
  const [MyProducts, setMyProducts] = useState([]);
  const { user } = useAuth();
  const [refrash, setRefresh] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/myProducts/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setMyProducts(data));
  }, [user, refrash]);

  const handleDelete = async (id) => {
    const isConfirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (isConfirmed.isConfirmed) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/deleteProduct/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("data", data);
        if (data.message === "Product deleted successfully") {
          setRefresh(!refrash);
          Swal.fire("Deleted!", data.message, "success");
        }
      } catch (error) {
        Swal.fire(
          "Error!",
          `There was a problem with the delete operation: ${error.message}`,
          "error"
        );
      }
    } else if (isConfirmed.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelled", "Your item is safe :)", "info");
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-4xl text-center font-semibold mt-20 mb-10 text-gray-600">
          Your All Products Here
        </h1>
      </div>
      <div>
        <div>
          <table className="table overflow-auto table-zebra text-gray-600">
            {/* head */}
            <thead className="bg-gray-300 text-gray-600">
              <tr>
                <th>SL</th>
                <th>Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>shopEmail</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {MyProducts?.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img className="w-14 h-14" src={product?.image} alt="" />
                  </td>
                  <td>{product.name}</td>
                  <td>{product?.price}</td>
                  <td>{product?.shopEmail}</td>
                  <td>
                    <p
                      className={`${
                        product.status === "pending"
                          ? "text-orange-400"
                          : product?.status === "approved"
                          ? "text-success"
                          : "text-red-600"
                      }`}
                    >
                      {product.status}
                    </p>
                  </td>
                  <td>
                    <FaRegTrashAlt
                      onClick={() => handleDelete(product?._id)}
                      className="hover:text-red-500 cursor-pointer text-xl"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
