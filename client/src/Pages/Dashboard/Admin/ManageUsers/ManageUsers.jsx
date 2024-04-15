import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import SectionWraper from "../../../../components/Wrapper's/SectionWraper";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [refresh]);

  const [axiosSecure] = useAxiosSecure();
  const handleRole = (id, role) => {
    axiosSecure.put(`/usersRole/${id}`, { role }).then((res) => {
      setRefresh(!refresh);
    });
  };

  return (
    <SectionWraper>
      <h1 className="mt-20 mb-10 text-4xl text-center font-semibold text-gray-600">
        Manage Users
      </h1>
      <div className="overflow-x-auto text-gray-600">
        <table className="table">
          {/* head */}
          <thead className="bg-gray-200 py-3">
            <tr className="text-gray-600 rounded-tr-md rounded-tl-md">
              <th>SL</th>
              <th>Image</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((singleUser, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={singleUser?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{singleUser.name}</td>
                <td>{singleUser.email}</td>
                <td
                  className={`font-semibold ${
                    singleUser?.role === "admin"
                      ? "text-teal-500"
                      : singleUser?.role === "shoper"
                      ? "text-green-500"
                      : "text-fuchsia-500"
                  }`}
                >
                  {singleUser?.role === "admin"
                    ? "Admin"
                    : singleUser?.role === "shoper"
                    ? "shoper"
                    : "Customer"}
                </td>
                <td className="flex gap-4">
                  <button
                    onClick={() => handleRole(singleUser?._id, "admin")}
                    disabled={singleUser?.role === "admin" && true}
                    className="btn btn-primary btn-xs "
                  >
                    Make Admin
                  </button>
                  <button
                    onClick={() => handleRole(singleUser?._id, "shoper")}
                    disabled={
                      singleUser?.role === "shoper"
                        ? true
                        : singleUser?.email === user?.email
                    }
                    className="btn btn-primary btn-xs"
                  >
                    Make Shoper
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

export default ManageUsers;
