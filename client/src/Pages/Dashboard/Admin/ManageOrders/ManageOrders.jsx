import React, { useEffect, useState } from "react";
import SectionWraper from "../../../../components/Wrapper's/SectionWraper";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/allOrders`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [refresh]);

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
          `${import.meta.env.VITE_API_URL}/deleteOrder/${id}`,
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
        if (data.message === "Order deleted successfully") {
          setRefresh(!refresh);
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
    <SectionWraper>
      <h1 className="my-5 text-3xl text-center underline text-gray-600">
        Manage Order
      </h1>
      <div className="text-gray-600 overflow-auto">
        <ul className="grid grid-cols-6 lg:gap-20 sm:gap-3 py-3 bg-gray-200 px-5 rounded-tl-md rounded-tr-md">
          <li>Sl</li>
          <li>Date</li>
          <li>Customer</li>
          <li>Status</li>
          <li>Total</li>
          <li>Action</li>
        </ul>

        {orders?.map((order, index) => (
          <ul className="grid grid-cols-6 lg:gap-20 sm:gap-3 py-5 bg-gray-100 px-5 rounded-bl-md rounded-br-md border-b">
            <li>{index + 1}</li>
            <li>{order?.createdAt}</li>
            <li>{order?.name}</li>
            <li
              onClick={() => handleStatus(order?._id, "approved")}
              className={`${
                order?.paidStatus ? "text-green-500" : "text-yellow-500"
              } py-1 text-sm px-3 mx-auto rounded-lg`}
            >
              {order?.paidStatus ? "Delivered" : "Unpaid"}
            </li>
            <li>${order?.price}</li>
            <li>
              <FaRegTrashAlt
                onClick={() => handleDelete(order?._id)}
                className="text-xl cursor-pointer hover:text-red-500 transition-all duration-300"
              />
            </li>
          </ul>
        ))}
      </div>
    </SectionWraper>
  );
};

export default ManageOrders;
