import { Button, Container, Navbar, Modal, Nav} from 'react-bootstrap'
import {useState, useContext} from 'react'
import { CartContext } from '../CartContext'
import CartProduct from './CartProduct'
import {HiOutlineShoppingBag} from 'react-icons/hi2'
import {FaShoppingBasket} from 'react-icons/fa'

function NavbarComponent() {
    const cart = useContext(CartContext)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const checkout = async () => {
        await fetch('http://localhost:4000/checkout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({items: cart.items})
        })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            if(response.url){
                const { url, checkoutSessionId, success_url } = response;
                console.log(success_url)
                window.location.assign(url); //forwarding user to stripe
            }
        })
            
    }

    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0)

    return (
        <>
            <Navbar expand='xs' className="d-flex justify-content-between text-light ">
                <a class="navbarBrand" href='/'>
                    <img src="../../images/cloudmallow-logo-3.png" width="150rem" className="mw-100"/>
                </a>
                <Button onClick={handleShow}><FaShoppingBasket className='shopping-cart-icon'/> ( {productsCount} items )</Button>
                {/* <div className="">
                    <Navbar.Toggle className="text-light"/>
                    <Navbar.Collapse className=""> */}
                        {/* <Nav className="d-flex justify-content-between">
                            <Nav.Link className="navbarTextColor" href="/">Home</Nav.Link>
                            <Nav.Link className="navbarTextColor" href="/aboutus">About Us</Nav.Link>
                            <Nav.Link className="navbarTextColor" href="/contactus">Contact Us</Nav.Link>
                        </Nav> */}
                        {/* <Button onClick={handleShow}>Cart ({productsCount} items)</Button> */}
                    {/* </Navbar.Collapse> */}
                {/* </div> */}
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productsCount > 0?
                        <>
                            <p>Items in your cart:</p>
                            {cart.items.map((currentProduct, idx) => (
                                <CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
                            ))}

                            <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>
                            <Button variant='success' onClick={checkout}>
                                Purchase items!
                            </Button>
                        </>
                    :
                    <h1>There are no items in your cart!</h1>
                    }
                </Modal.Body>
            </Modal>
            {/* <nav className="navbar navbar-expand-sm navbar-dark">
                <div className="container">
                    <a href="/" className="navbar-brand">CloudMallow</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navmenu">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navmenu">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
                            <li className="nav-item"><a href="#menu" className="nav-link">Menu</a></li>
                            <li className="nav-item"><a href="#contactus" className="nav-link">Contact Us</a></li>
                        </ul>
                        <button className="btn btn-primary" type="button" data-toggle="modal" data-target="#modal">Cart ({productsCount} items)</button>
                    </div>
                </div>
            </nav>
            <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Shopping Cart</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {productsCount > 0?
                                <>
                                    <p>Items in your cart:</p>
                                    {cart.items.map((currentProduct, idx) => (
                                    <CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
                                    ))}
                                    <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>
                                    <Button variant='success' onClick={checkout}>
                                        Purchase items!
                                    </Button>
                                </>
                            :
                            <h1>There are no items in your cart!</h1>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )

}



export default NavbarComponent;

