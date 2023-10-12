import React, {useState, useEffect} from "react"
import {Table} from "react-bootstrap"
import AdminNavbar from "../components/AdminNavbar"


function OrderList(){
    const [orderDetails, setOrderDetails] = useState([])

    useEffect(() => {
        fetchOrderDetails();
    }, [])

    const fetchOrderDetails = async () => {
        try {
            const response = await fetch("http://localhost:4000/order-details", {
                mode: 'cors',
                credentials: 'include'
            })
            console.log(response)
            // const redirectUrl = await response.json()
            // console.log(redirectUrl.url)
            // console.log(redirectUrl)
            const data = await response.json()
            // console.log("after fetch in frontend")
            // window.location.href = url.url
            if (data.url === "http://localhost:3000/admin/login"){
                window.location.href = data.url
            } else if (response.ok) {
                console.log(response.ok)
                // const data = await response.json()
                console.log(data)
                setOrderDetails(data)
            } else {
                console.log("trouble")
            }
        } catch (error) {
            console.error("Error fetching checkout details", error)
        }
    }

    return(
        <div className="row">
            <container className="vh-100 col-2">
                <AdminNavbar />
            </container>
            <container className="vh-100 col overflow-auto m-3">
                <h1>Order List</h1>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Order ID</th>
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
            </container>
        
            
        </div>
    )
}

export default OrderList;