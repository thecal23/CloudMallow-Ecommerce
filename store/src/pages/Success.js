import { useLocation, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import NavbarComponent from '../components/Navbar';

function Success() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const checkoutSessionId = queryParams.get('session_id');
    console.log(checkoutSessionId);

    const [checkoutDetails, setCheckoutDetails] = useState({})


    //call fetchCheckoutDetails function when landing on success page
    useEffect(() => {
        fetchCheckoutDetails();
        console.log("inside you useeffect")
    }, [])

    const fetchCheckoutDetails = async () => {
        try {
            const response = await fetch("http://localhost:4000/success-page", {
                headers: {
                    "checkout-Session-Id": checkoutSessionId
                }
            })
            if (response.ok) {
                const data = await response.json()

                setCheckoutDetails(data)
            }
        } catch (error) {
            console.error("Error fetching checkout details", error)
        }
    }

    const redirectToHomepage = () => {
        window.location.href = "/"
    }

    return (
        <>
            {/* <div>
                <NavbarComponent />
            </div>
            {checkoutDetails.customer_details ? (
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <h1>Thank you for your order {checkoutDetails.customer_details.name} </h1>
                    <div>
                        <h2>Checkout Details :</h2>
                        <h4>Email : {checkoutDetails.customer_details.email}</h4>
                        <h4>Shipping Address : {checkoutDetails.customer_details.address.line1}, {checkoutDetails.customer_details.address.city}, {checkoutDetails.customer_details.address.state}, {checkoutDetails.customer_details.address.postal_code}</h4>
                        <h4>Payment Status : {checkoutDetails.payment_status}</h4>
                        <h4>Status : {checkoutDetails.status}</h4>
                        <h4>Order ID : {checkoutDetails.metadata.orderId}</h4>
                        <h4>Amount Total : {(checkoutDetails.amount_total / 100).toFixed(2)} {checkoutDetails.currency}</h4>
                        <button className="btn btn-primary">Home</button>
                    </div>
                </div>
            ) : null} */}
            {checkoutDetails.customer_details ? (
                <div className="d-flex flex-column justify-content-center align-items-center text-center vh-100 w-100">
                    <div><img src="../../images/success1.png" className="img-fluid w-50"></img></div>
                    <div className="mt-5"><h1 className="text-center">Thank you for your order {checkoutDetails.customer_details.name}</h1></div>
                    <div className="mt-3">Order ID: {checkoutDetails.metadata.orderId}</div>
                    <div className="mt-3">Shipping Address: {checkoutDetails.customer_details.address.line1}, {checkoutDetails.customer_details.address.city}, {checkoutDetails.customer_details.address.state}, {checkoutDetails.customer_details.address.postal_code}</div>
                    <div className="mt-3">Amount Paid: {(checkoutDetails.amount_total / 100).toFixed(2)} {checkoutDetails.currency}</div>
                    <button className="btn btn-primary mt-5" onClick={redirectToHomepage}>Order Again</button>
                </div>
            ) : <div>Loading</div>}
        </>


    )
}

export default Success;