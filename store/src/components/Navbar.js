import { Button, Container, Navbar, Modal} from 'react-bootstrap'
import {useState, useContext} from 'react'
import { CartContext } from '../CartContext'
import CartProduct from './CartProduct'

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
            <Navbar expand='sm' className="bg-dark text-light">
                <Navbar.Brand className="text-light p-3" href='/'>CloudMallow</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="p-3 justify-content-end">
                    <Button onClick={handleShow}>Cart ({productsCount} items)</Button>
                </Navbar.Collapse>
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
        </>
    )

}

export default NavbarComponent;