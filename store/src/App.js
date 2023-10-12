import logo from './logo.svg';
import './App.css';
import NavbarComponent from './components/Navbar';
// import 'bootstrap/dist/css/bootstrap.min.css'
import './css/stylesheet.css'
import { Container } from 'react-bootstrap';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Cancel from './pages/Cancel';
import Store from './pages/Store';
import Success from './pages/Success';
import CartProvider from './CartContext';
import AdminDashboard from './pages/AdminDashboard';
import OrderList from './pages/OrderList';
import CustomersList from './pages/CustomersList';
import AdminLogin from './components/AdminLogin';
import Testing from './components/Testing';
import {useState, useEffect} from 'react'
import Registration from './pages/Registration';
import Login from './pages/Login';
import ContactUs from './pages/ContactUs';

function App() {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:4000/api/submit');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.log('Failed to fetch products');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <CartProvider products={products}>
      {/* <Container> */}
        {/* <NavbarComponent></NavbarComponent> */}
        <BrowserRouter>
          <Routes>
            <Route index element={<Store products={products} />} />
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
            <Route path="admin" element={<AdminDashboard/>} />
            <Route path="admin/customerslist" element={<CustomersList/>} />
            <Route path="admin/orderlist" element={<OrderList/>} />
            <Route path="admin/login" element={<Login/>} />
            <Route path="testing" element={<Testing/>} />
            <Route path="admin/registration" element={<Registration />} />
            <Route path="contactus" element={<ContactUs />} />
          </Routes>
        </BrowserRouter>
      {/* </Container> */}
    </CartProvider>
  );
}




export default App;
