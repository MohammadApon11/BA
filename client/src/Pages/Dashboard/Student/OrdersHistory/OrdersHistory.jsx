import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";

const OrderHistory = () => {
  const [payments, setPayments] = useState([]);
  const { user } = useAuth();
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/order/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setPayments(data));
  }, [user]);

  return (
    <div>
      <div>
        <h1 className="text-center text-4xl font-semibold mt-20 mb-10 text-gray-600">
          My All Payments History Here
        </h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="text-gray-600">
              <tr>
                <th>Sl</th>
                <th>Order Name</th>
                <th>Enrolled Date : Sorted</th>
                <th>Status</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index} className="text-gray-600 border">
                  <td className="border">{index + 1}</td>
                  <td className="border">{payment?.orderName}</td>
                  <td className="border">{payment?.createdAt}</td>
                  <td className="border">
                    <div className="border-green-500 border-b-[4px] border-l-[4px] border-t-[1px] border-r-[1px] rounded-md flex items-center justify-center text-green-500 w-[60px]">
                      Paid
                    </div>
                  </td>
                  <td className="text-green-500 border">Tk<span >{payment?.totalAmount}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
