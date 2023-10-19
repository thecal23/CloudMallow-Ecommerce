import React, { useState, useEffect } from 'react'
import NavbarComponent from '../components/Navbar'
import AdminNavbar from '../components/AdminNavbar'
import AdminNav2 from '../components/AdminNav2'

function Registration() {
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

    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const register = async () => {
        try {
            const response = await fetch("http://localhost:4000/admin/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: registerEmail,
                        password: registerPassword,
                        firstName: firstName,
                        lastName: lastName
                    }),
                });

            if (!response.ok) {
                throw new Error("Registration failed");
            }

            const data = await response.json();
            console.log("Registration successful", data);
            alert("Registration Successful")
            // Handle success or show a success message
        } catch (error) {
            console.log("Registration failed", error);
            // Handle error or show an error message
        }
    };

    return (
        <>
            <div className="">
                <div className=''>
                    <AdminNav2 />
                </div>
                <div className="d-flex justify-content-center align-items-center flex-column container">
                    <div>
                        <h1 className="text-center my-5">
                            Create Admin User
                        </h1>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <form className="border border-5 p-5 rounded">
                            <label htmlFor="name" className="form-label w-100 fs-5">First Name</label>
                            <input type="text" id="name" className="form-control border-3 mb-3" value={firstName} onChange={(e) => { setFirstName(e.target.value)}}></input>

                            <label htmlFor="lastname" className="form-label w-100 fs-5">Last Name</label>
                            <input type="text" id="lastname" className="form-control border-3 mb-3" value={lastName} onChange={(e) => { setLastName(e.target.value)}}></input>

                            <label htmlFor="registration-email" className="form-label w-100 fs-5">Email</label>
                            <input type="email" id="registration-email" className="form-control border-3 mb-3" value={registerEmail} onChange={(e) => { setRegisterEmail(e.target.value) }}></input>

                            <label htmlFor="registration-password" className="form-label w-100 fs-5">Password</label>
                            <input type="password" id="registration-password" className="form-control border-3" value={registerPassword} onChange={(e) => { setRegisterPassword(e.target.value) }} minLength="8"></input>
                            <div className="form-text">Your password must be minimum 8 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.</div>

                            <button className="btn btn-primary w-100 text-center mt-5" onClick={register}>Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Registration