import React, { useState } from 'react'
import NavbarComponent from '../components/Navbar'
import Footer from '../components/Footer'

function ContactUs() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    return (
        <>
                <div className="bg-logo"><NavbarComponent /></div>
            <div className="container">
                <div className="d-flex justify-content-center align-items-center flex-column container">
                    <div>
                        <h1 className="text-center my-5">
                            Contact Us
                        </h1>
                    </div>
                    <div className="w-75">
                        <form className="border border-5 p-5 rounded w-100">
                            <label htmlFor="name" className="form-label w-100 fs-5">First Name</label>
                            <input type="text" id="name" className="form-control border-3 mb-3" value={firstName} onChange={(e) => { setFirstName(e.target.value) }}></input>

                            <label htmlFor="lastname" className="form-label w-100 fs-5">Last Name</label>
                            <input type="text" id="lastname" className="form-control border-3 mb-3" value={lastName} onChange={(e) => { setLastName(e.target.value) }}></input>

                            <label htmlFor="email" className="form-label w-100 fs-5">Email</label>
                            <input type="email" id="email" className="form-control border-3 mb-3" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>

                            <label htmlFor="message" className="form-label w-100 fs-5">Message</label>
                            <textarea type="text" id="message" rows="3" className="form-control border-3 mb-3" value={message} onChange={(e) => { setMessage(e.target.value) }}></textarea>

                            <button className="btn btn-primary w-100 text-center mt-5">Send</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="footer mt-5"><Footer /></div>
        </>
    )
}

export default ContactUs