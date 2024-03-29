import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STIPE_PK)

const Payment = () => {
    const { id } = useParams()
    const [selectedClass, setSelectedClass] = useState({})

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/paySelected/${id}`)
            .then(res => res.json())
            .then(data => {
                setSelectedClass(data)
                console.log("from selected", data)
            })
    }, [id])

    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm selectedClass={selectedClass} price={selectedClass.price}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;