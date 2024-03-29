import { Fade } from "react-awesome-reveal";
import {Link} from "react-router-dom"

const Instructor = ({ instructor }) => {
    return (
        <Fade>
            <div className="card card-compact w-80 bg-base-100 shadow-xl">
                <figure>
                    <img className="rounded-lg w-full" src={instructor.image} alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{instructor.name}</h2>
                    <p>Number Of classes: {instructor.number_of_classes}</p>
                    <div className="card-actions justify-end">
                        <Link to="/instructors" className="btn btn-primary">see classes</Link>
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default Instructor;