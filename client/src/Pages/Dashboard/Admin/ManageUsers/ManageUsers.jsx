import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageUsers = () => {
    const [users, setUsers] = useState([])
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/users`)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [refresh])

    const [axiosSecure] = useAxiosSecure()
    const handleRole = (id, role) => {
        axiosSecure.put(`/usersRole/${id}`, { role })
            .then(res => {
                setRefresh(!refresh)
                console.log("from admin", res.data)
            })
    }

    return (
        <div>
            <div>
                <h1 className="mt-20 mb-10 text-4xl text-center font-semibold">All Users Here!</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Image</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) => <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user?.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className={`font-semibold ${user?.role === "admin" ? "text-teal-500" : user?.role === "instructor" ? "text-green-500" : "text-fuchsia-500"}`}>{user?.role ? user?.role : "student"}</td>
                                <td className="flex gap-4">
                                    <button
                                        onClick={() => handleRole(user?._id, "admin")}
                                        disabled={user?.role === "admin" && true} className="btn btn-primary btn-xs">Make Admin</button>
                                    <button onClick={() => handleRole(user?._id, "instructor")}
                                        disabled={user?.role === "instructor" && true} className="btn btn-primary btn-xs">Make Instructor</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;