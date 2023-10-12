import React from 'react';


const AdminNavbar = () => {
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
    <nav className="vh-100 bg-dark text-light flex-column overflow-hidden d-flex justify-content-start p-5">
      <a className="navbar-brand text-center" href="/">CloudMallow</a>
      <ul className="text-center navbar-nav list-unstyled mt-5">
        <li className="nav-item mb-1"><a className="nav-link text-light" href="/admin">Dashboard</a></li>
        <li className="nav-item mb-1"><a className="nav-link text-light" href="/admin">Products</a></li>
        <li className="nav-item mb-1"><a className="nav-link text-light" href="/admin/orderlist">Orders</a></li>
        <li className="nav-item mb-1"><a className="nav-link text-light" href="/admin/customerslist">Customers</a></li>
        <li className="nav-item mb-1"><a className="nav-link text-light" href="/admin/registration">Create Admin User</a></li>
        <li className="nav-item mb-1" onClick={logout}>Logout</li>
      </ul>
    </nav>
  );
  
};

export default AdminNavbar;
