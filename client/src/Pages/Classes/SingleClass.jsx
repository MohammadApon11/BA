import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";

const SingleClass = ({ singleClass }) => {
    const [isAdmin] = useAdmin();
    const admin = isAdmin?.admin?.admin;
    const instructor = isAdmin?.instructor?.instructor;
    const { user } = useAuth()
    const navigate = useNavigate();
    const handleSelect = (singleClass) => {
        if (!user) {
            Swal.fire(
                'Login First',
                'Login First before selecting!',
                'warning'
            )
            navigate("/login")
            return;
        }
        const email = user?.email;
        const { image, className, instructor, available_seats, price, students, _id } = singleClass;
        const selectedClass = { id: _id, email, image, className, instructor, available_seats, price, students }
        fetch(`${import.meta.env.VITE_API_URL}/selected/${_id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(selectedClass)
        })
            .then(res => res.json())
            .then(data => {
                if (data.matchedCount === 1) {
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'The class Already selected',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                if (data.upsertedCount > 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Successfully Selected',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                console.log(data)
            })
    }
    return (
        <div data-aos="fade-left">
            <div className={`card w-80 bg-base-100 shadow-xl ${singleClass.available_seats === 0 ? "cursor-not-allowed bg-red-800" : ""}`}>
                <figure className="px-10 pt-10">
                    <img src={singleClass.image} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body">
                    <p className="text-xl"><span className="font-semibold">Class Name: </span>{singleClass.className}</p>
                    <p className="text-xl"><span className="font-semibold">Instructor: </span>{singleClass.instructor}</p>
                    <p className="text-xl dark:text-gray-400">
                        <span className=" font-semibold">Available Seats:</span> {singleClass.available_seats}
                    </p>
                    <p className="text-xl"><span className="font-semibold">Monthly Fee: </span>${singleClass.price}</p>
                    <p className="text-xl"><span className="font-semibold">Students: </span>{singleClass.students}</p>
                    <div className="card-actions">
                        {admin ? (
                            <button className="btn bg-blue-600 btn-disabled">Can not Select</button>
                        ) : instructor ? (
                            <button className="btn bg-blue-600 btn-disabled w-full">Can not Select</button>
                        )
                            : singleClass.available_seats === 0 ? (<button className="btn bg-blue-600 btn-disabled w-full">Can not Select</button>
                            )
                                : (
                                    <button onClick={() => handleSelect(singleClass)} className="btn btn-active btn-primary w-full">Select</button>
                                )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleClass;
