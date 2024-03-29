import { useEffect, useState } from "react";
import Container from "../Shared/Container/Container";
import SingleInstructor from "./SingleInstructor";
import './Instructors.css'

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/instructors`)
            .then(res => res.json())
            .then(data => setInstructors(data))
    }, [])
    return (
        <div>
            <div className="hero min-h-screen instructors-bg text-white">
                <div className="hero-content flex-col lg:flex-row">
                    <img src="https://img.freepik.com/free-photo/full-shot-kids-football-team_23-2149271033.jpg?size=626&ext=jpg&ga=GA1.1.24677610.1673838713&semt=ais" className="rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold ">The Best Leaders Are Great Teachers</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button className="btn btn-primary">About Them</button>
                    </div>
                </div>
            </div>
            <Container>
                <div className="mt-10 mb-10 lg:flex justify-between items-center">
                    <div>
                        <h1 className="text-primary text-3xl font-semibold font-sans uppercase">Our All Chief Instructors Here</h1>
                        <p className="text-primary lg:mt-8">Sharing culture and openness to the world </p>
                        <p className="text-primary  lg:mt-4">are at the heart of our associative project.</p>
                    </div>
                    <div>
                        <button className="btn btn-active btn-primary uppercase mt-5 lg:mt-0">Become a instructor</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {instructors.map((instructor, index) => <SingleInstructor key={index} instructor={instructor}></SingleInstructor>)}
                </div>
            </Container>
        </div>
    );
};

export default Instructors;