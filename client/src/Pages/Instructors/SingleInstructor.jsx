import { Fade } from 'react-awesome-reveal';
import { MdVerifiedUser } from 'react-icons/md';

const SingleInstructor = ({ instructor }) => {

    return (
        <Fade>
            <div className="mt-5">
                <div className="card lg:card-side bg-base-100 shadow-xl">
                    <figure><img className="rounded-xl" src={instructor.image} alt="Album" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{instructor.name}</h2>
                        <p>{instructor.email}</p>
                        <ol>
                            <li className='text-lg font-semibold'>All classes: 3</li>
                            {instructor.name_of_classes.map((singleClass, index) =>
                                <li className="uppercase flex items-center gap-1" key={index}><MdVerifiedUser className='text-primary' />{singleClass}</li>
                            )}
                        </ol>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">See More Classes</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default SingleInstructor;