import React from 'react'

function AdminNav2() {
    const logout = async () => {
        try {
            const response = await fetch("http://localhost:4000/admin/logout", {
                method: "GET",
                credentials: "include"
            })

            if (!response.ok) {
                throw new Error("Network response was not ok")
            }
            const data = await response.json()
            console.log(data.message)
            // console.log("User is logged out")
            window.location.href = "http://localhost:3000/admin/login"
        } catch (error) {
            console.error("Error logging out user : ", error)
        }
    }


    return (
        <>
            <div className="bg-dark w-100">
                <div className="container">
                    <nav className="navbar navbar-nav navbar-dark navbar-expand-lg w-100">
                        <a href="/" className="text-light h2 text-decoration-none">CloudMallow</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                                <a class="nav-link active h2" href="/">Home</a>
                                <a class="nav-link active h2" href="/admin">Dashboard</a>
                                <a class="nav-item nav-link active h2" href="/admin/products">Products</a>
                                <a class="nav-item nav-link active h2" href="/admin/orderlist">Orders</a>
                                <a class="nav-item nav-link active h2" href="/admin/customerslist">Customers</a>
                                <a class="nav-item nav-link active h2" href="/admin/registration">Create Admin User</a>
                                <a class="nav-item nav-link active h2" href="/admin/login">Login</a>
                                <a class="nav-item nav-link active h2" onClick={logout}>Logout</a>
                            </div>
                        </div>
                    </nav>
                </div >
            </div >
        </>
    )
}

export default AdminNav2