import React, { useState } from 'react'
import NavbarComponent from '../components/Navbar';
import AdminNav2 from '../components/AdminNav2';

function Login() {
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const login = async () => {
        try {
            const response = await fetch("http://localhost:4000/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: loginEmail, //in a typical local strategy Passport expects the 'username' and 'password' fields in the request body. Our username will be the email.
                    password: loginPassword,
                }),
                credentials: "include", // Include credentials (cookies)
            });
            console.log(response)
            if (response.ok) {
                const data = await response.json();
                console.log("Login successful", data);
                window.location.href = "http://localhost:3000/admin/"
                // Handle success or redirect to another page
            } else {
                const errorData = await response.json(); // Parse error response data
                console.log("Login failed", errorData);
                // Handle error or show an error message
            }
        } catch (error) {
            console.error("Error:", error);
            // Handle network or other errors here
        }
    };

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

        } catch (error) {
            console.error("Error logging out user : ", error)
        }
    }

    return (
        <>
            <div className="">
                <div className=''>
                    <AdminNav2 />
                </div>
                <div className="d-flex justify-content-center align-items-center flex-column container">
                    <div>
                        <h1 className="text-center my-5">
                            Admin Login
                        </h1>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <form className="border border-5 p-5 rounded">
                            <label htmlFor="login-email" className="form-label w-100 fs-5">Email</label>
                            <input type="email" id="login-email" className="form-control border-3 mb-3" value={loginEmail} onChange={(e) => { setLoginEmail(e.target.value); console.log(loginEmail) }}></input>

                            <label htmlFor="login-password" className="form-label w-100 fs-5">Password</label>
                            <input type="password" id="login-password" className="form-control border-3" value={loginPassword} onChange={(e) => { setLoginPassword(e.target.value) }} minLength="8"></input>

                            <button className="btn btn-primary w-100 text-center mt-5" onClick={login}>Login</button>
                            <button className="btn btn-danger w-100 text-center mt-5" onClick={logout}>Logout</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login