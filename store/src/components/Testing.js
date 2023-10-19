import React from 'react'
import AdminNavbar from './AdminNavbar';
import AddToCartButton from './AddToCartButton';
import Form from './Form';
import { Button } from 'react-bootstrap';
import NavbarComponent from './Navbar';
import AdminNav2 from './AdminNav2';

function Testing() {
  function fetchData() {
    fetch("http://localhost:4000/testing")
      .then((response) => {
        if (!response.redirected) {
          throw new Error("redirected is false");
        }
        console.log(response.url)
        window.location.href = response.url

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }



  return (
    <>
      <div className="d-flex">  
        <AdminNav2 /> 
      </div>
    </>
  )
}

export default Testing