import { useEffect, useState } from "react";
import Instructor from "./Instructor";
import Container from "../../Pages/Shared/Container/Container";

const PopularInstructor = () => {
    const [instructors, setInstructors] = useState([])
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/instructors`)
            .then(res => res.json())
            .then(data => setInstructors(data))
    }, [])
    return (
        <Container>
            <h1 className="text-center mt-20 text-4xl font-bold font-sans mb-10">World Famous Chief Instructors</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {instructors.map((instructor, index) => <Instructor key={index} instructor={instructor}></Instructor>)}
            </div>
        </Container>
    );
};

export default PopularInstructor;