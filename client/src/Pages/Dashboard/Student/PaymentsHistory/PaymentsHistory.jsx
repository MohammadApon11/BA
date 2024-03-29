import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";

const PaymentsHistory = () => {
    const [payments, setPayments] = useState([]);
    const { user } = useAuth()
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/payments/${user?.email}`)
            .then(res => res.json())
            .then(data => setPayments(data))
    }, [user])


    return (
        <div>
            <div>
                <h1 className="text-center text-4xl font-semibold mt-20 mb-10">My All Payments History Here</h1>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Sl</th>
                                <th>Class Name</th>
                                <th>Enrolled Date : Sorted</th>
                                <th>Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map((payment, index) => <tr key={index} className="bg-base-200">
                                    <td>{index + 1}</td>
                                    <td>{payment.itemNames}</td>
                                    <td>{payment.date}</td>
                                    <td>${payment.price}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentsHistory;