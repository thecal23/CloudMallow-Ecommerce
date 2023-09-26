import React, {useState, useEffect} from "react"
import {Table} from "react-bootstrap"
import AdminNavbar from "../components/AdminNavbar"

function CustomersList(){
    const [customersDetails, setCustomersDetails] = useState([])

    useEffect(() => {
        fetchCustomersDetails();
    }, [])

    // const fetchCustomersDetails = async () => {
    //     try {
    //         const response = await fetch("http://localhost:4000/customers-details", {
    //             mode: 'cors',
    //             credentials: 'include'
    //         })
    //         console.log(response)
    //         if (response.redirected){
    //             window.location.href = response.url
    //         } else if (response.ok) {
    //             const data = await response.json()
    //             setCustomersDetails(data)
    //         } else {
    //             throw new Error("Error fetching customer details")
    //         }
    //     } catch (error) {
    //         console.error("Error fetching checkout details", error)
    //     }
    // }
    const fetchCustomersDetails = async () => {
        try {
            const response = await fetch("http://localhost:4000/customers-details", {
                mode: 'cors',
                credentials: 'include'
            })
            console.log(response)
            const data = await response.json()
            // console.log(url.url)
            // console.log(response)
            // console.log("after fetch in frontend")
            if (data.url === "http://localhost:3000/admin/login"){
                window.location.href = data.url
            } else if (response.ok) {
                console.log(response.ok)
                // const data = await response.json()
                setCustomersDetails(data)
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
                <h1>Customers List</h1>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Country</th>
                            <th>Postal Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customersDetails.map((detail) => (
                        <tr key={detail.email}>
                            <td>{detail.fullName}</td>
                            <td>{detail.email}</td>
                            <td>{detail.country}</td>
                            <td>{detail.postalCode}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </container>           
        </div>
    )
}

export default CustomersList;