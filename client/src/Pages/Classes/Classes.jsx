import { useEffect, useState } from "react";
import './Class.css'
import Container from "../Shared/Container/Container";
import SingleClass from "./SingleClass";

const Classes = () => {
    const [classes, setClasses] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/products`)
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])

    return (
        <div>
                <div className="hero min-h-screen class-bg"
                >
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">OUR ALL CLASSES HERE</h1>
                            <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                            <button className="btn btn-primary">See More Activities</button>
                        </div>
                    </div>
                </div>
            <Container>
                <div className="mt-20 mb-10">

                    <h1 className="mt-20 mb-10 text-4xl uppercase text-center text-primary font-semibold">This is our Presentation</h1>
                    <div className="grid gird-cols-1 lg:grid-cols-3 gap-10">
                        {classes.map((singleClass, index) => <SingleClass key={index} singleClass={singleClass}></SingleClass>)}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Classes;