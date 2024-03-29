import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MySelected = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: selected = [] } = useQuery({
        queryKey: ["selected", user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`/selected?email=${user?.email}`)
            return res.data

        }
    })

    const handleDelete = singleClass => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${import.meta.env.VITE_API_URL}/selected/${singleClass._id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your Selected class has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>Class Name</th>
                            <th>Instructor</th>
                            <th>Fee</th>
                            <th>Payment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            selected.length > 0 ? selected?.map((singleClass, index) => <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{singleClass.className}</td>
                                <td>{singleClass.instructor}</td>
                                <td>${singleClass.price}</td>
                                <td>
                                    <Link to={`/dashboard/payment/${singleClass._id}`} className="btn btn-xs bg-blue-600 text-white">Pay</Link>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(singleClass)}
                                        className="btn btn-xs bg-red-600 text-white">Delete</button>
                                </td>
                            </tr>)
                                :
                                <tr>
                                    <td className="text-xl text-red-600">Please Refresh the site or select your expected class, Sometimes you face the VERCEL data loading problem! Thank you.</td>

                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySelected;