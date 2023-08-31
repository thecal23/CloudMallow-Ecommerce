import React, {useState, useEffect} from "react"
import {Table} from "react-bootstrap"

function OrderList(){
    const [orderDetails, setOrderDetails] = useState([])

    useEffect(() => {
        fetchOrderDetails();
    }, [])

    const fetchOrderDetails = async () => {
        try {
            const response = await fetch("http://localhost:4000/order-details")
            console.log(response)
            if (response.ok) {
                console.log(response.ok)
                const data = await response.json()
                setOrderDetails(data)
            } else {
                console.log("trouble")
            }
        } catch (error) {
            console.error("Error fetching checkout details", error)
        }
    }

    return(
        <>
        <h1>Order List</h1>
        <Table striped bordered>
            <thead>
                <tr>
                    <th>Checkout Session ID</th>
                    <th>Payment Status</th>
                    <th>Amount Paid</th>
                </tr>
            </thead>
            <tbody>
                {orderDetails.map((detail) => (
                  <tr key={detail.checkoutSessionId}>
                    <td>{detail.checkoutSessionId}</td>
                    <td>{detail.paymentStatus}</td>
                    <td>{detail.amountTotal}$</td>
                  </tr>
                ))}
            </tbody>
        </Table>
            
        </>
    )
}

export default OrderList;