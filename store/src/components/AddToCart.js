import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { CartContext } from '../CartContext';
import addDecimal from '../utils/addDecimal';

function AddToCart({ product }) {
    const cart = useContext(CartContext);
    const [productQuantity, setProductQuantity] = useState(0);

    useEffect(() => {
        const fetchProductQuantity = () => {
            const quantity = cart.getProductQuantity(product._id);
            setProductQuantity(quantity);
        };
        fetchProductQuantity();
    }, [cart, product._id]);

    return (
        // <>
        //     {productQuantity > 0 ? (
        //     <>
        //         <Form as={Row}>
        //             <Form.Label column sm="6">
        //                 In Cart: {productQuantity}
        //             </Form.Label>
        //             <Col sm="6">
        //                 <Button sm="6" onClick={() => cart.removeOneFromCart(product._id)} className="mx-2">
        //                     -
        //                 </Button>
        //                 <Button sm="6" onClick={() => cart.addOneToCart(product._id)} className="mx-2">
        //                     +
        //                 </Button>
        //             </Col>
        //         </Form>
        //         <Button variant="danger" onClick={() => cart.deleteFromCart(product._id)} className="my-2">
        //             Remove from Cart
        //         </Button>
        //     </>
        //     ) : (
        //         <Button variant="logo-rim" className="rounded-pill" onClick={() => cart.addOneToCart(product._id)}>
        //             Add to Cart
        //         </Button>
        //     )}
        // </>
        <>
            <div className="d-flex flex-column justify-content-around align-items-center my-1">
                <div className="d-flex justify-content-between py-3" style={{ width: '6.75rem' }}>
                    <Button className="btn-sm btn-logo-rim rounded-pill" style={{ width: '1.75rem' }} onClick={() => cart.removeOneFromCart(product._id)}>-</Button>
                    <div className="text-center font-bold"><b>{productQuantity}</b></div>
                    <Button className="btn-sm btn-logo-rim rounded-pill" style={{ width: '1.75rem' }} onClick={() => cart.addOneToCart(product._id)}>+</Button>
                </div>
                <div className="">
                    <Button variant="logo-rim" className="rounded-pill" onClick={() => cart.addOneToCart(product._id)}>
                        Add to Cart
                    </Button>
                </div>
            </div>
        </>
    )
}

export default AddToCart