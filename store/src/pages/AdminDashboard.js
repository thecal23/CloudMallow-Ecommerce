import React, { useEffect } from "react";
import ProductTable from "../components/ProductTable";
import AdminNavbar from "../components/AdminNavbar";
import AdminNav2 from "../components/AdminNav2";

function AdminDashboard(){
    const checkForAuthentication = async () => {
        try {
            const response = await fetch("http://localhost:4000/admin", {
                mode: 'cors',
                credentials: 'include'
            })
            const data = await response.json()
            console.log(data)
            
            if (data.url === "http://localhost:3000/admin/login") {
                window.location.href = data.url
            }
            
            return;

        } catch (error) {
            console.log("Error: " , error)
        }
    }

    useEffect(() => {
        checkForAuthentication();
    }, []);

    return(
        // <div className="row">
        //     <container className="vh-100 col-2">
        //         <AdminNavbar />
        //     </container>
        //     <container className="vh-100 col overflow-auto m-3">
        //         <h1>Admin Dashboard</h1>
        //         <ProductTable/>
        //     </container>
        // </div>
        <>
            <div><AdminNav2 /></div>
            <div className="container mt-5">
                <h1>Admin Dashboard</h1>
                <ProductTable />
            </div>
        </>
    )
}

export default AdminDashboard;