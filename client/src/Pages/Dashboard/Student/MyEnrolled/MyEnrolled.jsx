import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import SingleEnrolled from "./SingleEnrolled";
import Container from "../../../Shared/Container/Container";

const MyEnrolled = () => {
    const [enrolled, setEnrolled] = useState([])
    const { user } = useAuth()

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/getEnrolled/${user?.email}`)
            .then(res => res.json())
            .then(data => setEnrolled(data))
    }, [user])

    console.log(enrolled)
    return (
        <Container>
            <div>
                <h1 className="text-4xl text-center mt-20 mb-10">Your All Enrolled Class</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {
                    enrolled?.map((singleEnrolled, index) => <SingleEnrolled
                        key={index}
                        singleEnrolled={singleEnrolled}
                    ></SingleEnrolled>)
                }
            </div>
        </Container>
    );
};

export default MyEnrolled;