import React, {useState, useEffect} from "react"
import {Table} from "react-bootstrap"

function CustomersList(){
    const [customersDetails, setCustomersDetails] = useState([])

    useEffect(() => {
        fetchCustomersDetails();
    }, [])

    const fetchCustomersDetails = async () => {
        try {
            const response = await fetch("http://localhost:4000/customers-details", {
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                setCustomersDetails(data)
            }
        } catch (error) {
            console.error("Error fetching checkout details", error)
        }
    }

    return(
        <>
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
            
        </>
    )
}

export default CustomersList;