
const SingleEnrolled = ({ singleEnrolled }) => {
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 ><span className="font-semibold">Class Name: </span>{singleEnrolled.className}</h2>
                    <p><span className="font-semibold">Instructor: </span>{singleEnrolled.instructor}</p>
                    <p><span className="font-semibold">Monthly Fee: </span>${singleEnrolled.price}</p>
                </div>
                <figure><img src={singleEnrolled?.image} alt="Shoes" /></figure>
            </div>
        </div>
    );
};

export default SingleEnrolled;