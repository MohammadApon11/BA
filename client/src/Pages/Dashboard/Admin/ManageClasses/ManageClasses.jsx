import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2'

const ManageClasses = () => {
    const [refresh, setRefresh] = useState(false);
    const [allClasses, setAllClasses] = useState([])
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/allClasses`)
            .then(res => res.json())
            .then(data => setAllClasses(data))
    }, [refresh])

    // feedback working here
    const [feedText, setFeedbackText] = useState("")
    const handleFeedbackTextChange = (event) => {
        setFeedbackText(event.target.value);
    };
    const [id, setId] = useState("")
    const [axiosSecure] = useAxiosSecure()
    const handleFeedback = id => {
        axiosSecure.put(`/classes/${id}`, { feedText })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire(
                        'Good job!',
                        'Successfully Feedback Send',
                        'success'
                    )
                }
            })
    }

    // updated status
    const handleStatus = (id, status) => {
        axiosSecure.put(`/classesStatus/${id}`, { status: status })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    setRefresh(!refresh)
                    Swal.fire(
                        'Good job!',
                        'Status Updated!',
                        'success'
                    )
                }
            })
    }
    return (
        <div>
            <div>
                <h1 className="text-4xl text-center font-semibold mt-20 mb-10">Here are all the classes that you will manage</h1>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Instructor</th>
                                <th>Email</th>
                                <th>Seats</th>
                                <th>Fee</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allClasses.map((singleClass, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={singleClass.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{singleClass.className}</td>
                                        <td>{singleClass.instructor}</td>
                                        <td>{singleClass.instructorEmail}</td>
                                        <td>{singleClass.available_seats}</td>
                                        <td>${singleClass.price}</td>
                                        <td className={`font-semibold ${singleClass.status === "approved" ? "text-success" : "text-red-600"}`}>{singleClass.status}</td>
                                        <td className="flex gap-2">

                                            <button onClick={() => handleStatus(singleClass._id, "approved")} className={`${singleClass.status === "approved" || singleClass.status === "denied" ? "btn btn-disabled btn-xs" : "btn btn-primary btn-xs"}`}>approve</button>

                                            <button onClick={() => handleStatus(singleClass._id, "denied")} className={`${singleClass.status === "approved" || singleClass.status === "denied" ? "btn btn-disabled btn-xs" : "btn btn-error bg-red-600 btn-xs text-white"}`}>Deny</button>

                                            <span onClick={() => window.my_modal_3.showModal()}>
                                                <button onClick={() => setId(singleClass._id)} className="btn btn-xs btn-primary">Feedback</button>
                                            </span>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <dialog id="my_modal_3" className="modal">
                    <form method="dialog" className="modal-box">
                        <button htmlFor="my-modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <div className="py-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Write Your Feedback</span>
                                </label>
                                <textarea onChange={handleFeedbackTextChange}
                                    value={feedText} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                            </div>
                        </div>
                        <div className="text-end">
                            <button type="submit" onClick={() => handleFeedback(id)} className="btn btn-primary btn-xs">Send</button>
                        </div>
                    </form>
                </dialog>
            </div>
        </div>
    );
};

export default ManageClasses;