import { useState } from "react";
import Container from "../../../Shared/Container/Container";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2'

const image_hosting_token = import.meta.env.VITE_image_hosting_token;
const AddClass = () => {

    // select available seats options here
    const options1 = [
        { value: '', text: 'Available Seats' },
        { value: '1', text: '1' },
        { value: '2', text: '2' },
        { value: '3', text: '3' },
        { value: '4', text: '4' },
        { value: '5', text: '5' },
        { value: '6', text: '6' },
        { value: '7', text: '7' },
        { value: '8', text: '8' },
        { value: '9', text: '9' },
        { value: '10', text: '10' },
        { value: '11', text: '11' },
        { value: '12', text: '12' },
        { value: '13', text: '13' },
        { value: '14', text: '14' },
        { value: '15', text: '15' },
        { value: '16', text: '16' },
        { value: '17', text: '17' },
        { value: '18', text: '18' },
        { value: '19', text: '19' },
        { value: '20', text: '20' },
    ];
    const [selected1, setSelected1] = useState(options1[0].value);

    const handleChange1 = event => {
        setSelected1(event.target.value);
    };

    // class add work here
    const { user } = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const image_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        console.log("from data", data)
        const formData = new FormData();
        formData.append("image", data.image[0])
        fetch(image_url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imageResponse => {
                if (imageResponse.success) {
                    const image = imageResponse.data.display_url;
                    const newClass = { ...data, image, students: 0 }
                    axiosSecure.post("/classes", newClass)
                        .then(res => {
                            if (res.data.insertedId) {
                                Swal.fire(
                                    'Your class successfully added',
                                    'success'
                                )
                            }
                            console.log("after added class", res.data)
                        })
                }
            })
    };



    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)} className="border-2 p-5 border-primary gap-5 rounded-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 rounded-lg">
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Class Name</span>
                        </label>
                        <input {...register("className", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Class Image</span>
                        </label>
                        <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Instructor Name</span>
                        </label>
                        <input
                            {...register("instructor")} type="text"
                            defaultValue={user?.displayName}
                            readOnly placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Instructor Email</span>
                        </label>
                        <input {...register("instructorEmail")}
                            defaultValue={user?.email}
                            readOnly type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Available Seats</span>
                        </label>
                        <select {...register("available_seats", { required: true })} className="input input-bordered w-full max-w-xs" value={selected1} onChange={handleChange1}>
                            {options1.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Monthly Fee</span>
                        </label>
                        <input {...register("price", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="w-full hidden max-w-xs">
                        <input {...register("status")} value="pending" type="text" placeholder="STATUS IS PENDING" className=" w-full max-w-xs" />
                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary w-1/2">ADD ClASS</button>
                </div>
            </form>
        </Container>
    );
};

export default AddClass;