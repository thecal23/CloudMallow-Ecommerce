import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Cancel(){
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const checkoutSessionId = queryParams.get('session_id');
    console.log(checkoutSessionId);

    useEffect(() => {
        deleteCheckoutDetails();
    }, [])

    const deleteCheckoutDetails = async () => {
        try {
            const response = await fetch("http://localhost:4000/cancel-page",{
                headers:{
                    "checkout-Session-Id":checkoutSessionId
                }
            })
            console.log(response)
            if(response.ok){
                console.log("checkout deleted from mongodb")
            } else{
                console.log("bad response or can't delete from mongodb")
            }
        } catch(error){
            console.error("Error deleting checkout details", error)
        }
    }

    return(
        <h1>Sorry to see you cancelled your Stripe payment!</h1>
    )
}

export default Cancel;