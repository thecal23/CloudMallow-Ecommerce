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
                    <th text-center>Order ID</th>
                    <th>Order Date</th>
                    <th>Customer Details</th>
                    <th>Items Purchased</th>
                    <th>Amount Paid</th>
                    <th>Payment Status</th>
                </tr>
            </thead>
            <tbody>
                {orderDetails.map((detail) => (
                  <tr key={detail.checkoutSessionId}>
                    <td>{detail.orderId}</td>
                    <td>{detail.orderDate}</td>
                    <td>
                        {detail.customerDetails[0].fullName} 
                        <br />
                        {detail.customerDetails[0].email}
                    </td>
                    <td>
                        {detail.itemsPurchased.map((item, index) => (
                            <span key={index}>
                                {item.itemName}
                                <br />
                            </span>
                        ))}
                    </td>
                    <td>{detail.amountTotal}$</td>
                    <td className={detail.paymentStatus === "paid" ? 'paid-status' : ''}>
                        {detail.paymentStatus}
                    </td>
                  </tr>
                ))}
            </tbody>
        </Table>
            
        </>
    )
}

export default OrderList;