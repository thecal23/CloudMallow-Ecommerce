import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { CartContext } from '../CartContext';
import AddToCart from './AddToCart';

function AddToCartButton() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
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
        <>
            <Row xs={1} className='g-4'>
            {products.map((product) => (
                <Col align='center'>
                    <AddToCart key={product._id} product={product} />
                </Col>
            ))}
            </Row>
        </>
    )
}

export default AddToCartButton