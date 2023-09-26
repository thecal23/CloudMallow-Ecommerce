import React from 'react';

const AdminNavbar = () => {
  return (
    <nav className="vh-100 bg-dark text-light flex-column overflow-hidden d-flex justify-content-start p-5">
      <a className="navbar-brand text-center" href="/">CloudMallow</a>  
      <ul className="text-center navbar-nav list-unstyled mt-5">
        <li className="nav-item mb-1"><a className="nav-link text-light" href="/admin">Dashboard</a></li>
        <li className="nav-item mb-1"><a className="nav-link text-light" href="/admin">Products</a></li>
        <li className="nav-item mb-1"><a className="nav-link text-light" href="/admin/orderlist">Orders</a></li>
        <li className="nav-item mb-1"><a className="nav-link text-light" href="/admin/customerslist">Customers</a></li>
        <li className="nav-item mb-1"><a className="nav-link text-light" href="/admin/login">Login</a></li>
        <li className="nav-item mb-1"><a className="nav-link text-light" href="/admin/login">Logout</a></li>
      </ul>
    </nav>
  );
// return (
//     <nav id="sidebar" className="bg-dark position-fixed">
//       <div className="p-5">
//         <h4 className="text-light">Sidebar</h4>
//         <ul className="list-unstyled components">
//           <li>
//             <a href="#home" className="text-light">Home</a>
//           </li>
//           <li>
//             <a href="#about" className="text-light">About</a>
//           </li>
//           <li>
//             <a href="#services" className="text-light">Services</a>
//           </li>
//           <li>
//             <a href="#contact" className="text-light">Contact</a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
};

export default AdminNavbar;
