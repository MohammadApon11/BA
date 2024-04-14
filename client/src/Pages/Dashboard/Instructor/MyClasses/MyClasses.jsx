import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";

const MyClasses = () => {
  const [myClasses, setMyClasses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/myClasses/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setMyClasses(data));
  }, [user]);

  return (
    <div>
      <h1 className="text-4xl text-center font-semibold mt-20 mb-10">
        Your All Class Here
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Class Name</th>
              <th>Available Seats</th>
              <th>Enrolled Students</th>
              <th>Status</th>
              <th>Action</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {myClasses?.map((singleClass, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{singleClass.className}</td>
                <td>{singleClass.available_seats} seats left</td>
                <td>{singleClass?.students}</td>
                <td>
                  <p
                    className={`${
                      singleClass.status === "pending"
                        ? "text-orange-400"
                        : singleClass?.status === "approved"
                        ? "text-success"
                        : "text-red-600"
                    }`}
                  >
                    {singleClass.status}
                  </p>
                </td>
                <td>
                  {singleClass?.feedback ? singleClass.feedback : "No feedback"}
                </td>
                <td>
                  <button className="btn btn-xs bg-slate-500 text-white hover:text-black">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClasses;
