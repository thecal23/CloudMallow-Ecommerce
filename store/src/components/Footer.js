import React from 'react'
import {FaInstagram} from 'react-icons/fa'

function Footer() {
    return (
        <>
            <footer className='container'>
                <container className="row py-2 d-flex align-items-center justify-content-center">                    
                        <ul className="list-unstyled d-flex justify-content-center align-items-center">
                            <li className="col-4 d-flex justify-content-center"><a className="links" href="/contactus">Contact Us</a></li>
                            <li className="col-4 d-flex justify-content-center"><a className="links" href="https://www.instagram.com/cloudmallowmtl/"><FaInstagram /></a></li>
                            <li className="col-4 d-flex justify-content-center"><a className="links" href="/aboutus">About Us</a></li>
                        </ul>
                </container>
            </footer>
        </>
    )
}

export default Footer