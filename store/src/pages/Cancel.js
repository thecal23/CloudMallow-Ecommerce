import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Cancel() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const checkoutSessionId = queryParams.get('session_id');
    console.log(checkoutSessionId);

    useEffect(() => {
        deleteCheckoutDetails();
    }, [])

    const deleteCheckoutDetails = async () => {
        try {
            const response = await fetch("http://localhost:4000/cancel-page", {
                headers: {
                    "checkout-Session-Id": checkoutSessionId
                }
            })
            console.log(response)
            if (response.ok) {
                console.log("checkout deleted from mongodb")
            } else {
                console.log("bad response or can't delete from mongodb")
            }
        } catch (error) {
            console.error("Error deleting checkout details", error)
        }
    }

    const redirectToHomepage = () => {
        window.location.href = "/"
    }


    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center text-center vh-100 w-100">
                <div>
                    <h1>Sorry to see you cancel your CloudMallow order!</h1>
                    <button className="btn btn-primary mt-5" onClick={redirectToHomepage}>Home</button>
                </div>
            </div>
        </>
    )
}

export default Cancel;