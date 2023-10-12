import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import AddToCart from './AddToCart';

function AddToCartButton() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null)

    const handleGetProduct = async () => {
        console.log("we inside handle get product")
        try {
            const response = await fetch('http://localhost:4000/api/chosen-product', {
                method: 'GET'
            })
            const data = await response.json()
            if (response.ok) {
                console.log(data[0].image)
                setSelectedProduct(data[0])
            } else {
                console.log("Error in get product")
            }
        } catch (error) {
            console.log("Error: ", error.message)
        }
    }

    useEffect(() => {
        handleGetProduct();
    }, []);

    return (
        <>
            {selectedProduct ?
                <Row xs={1} className='g-4'>
                    <Col  align='center'>
                        <AddToCart key={selectedProduct._id} product={selectedProduct} />                        
                    </Col>
                </Row>
            : null}
        </>
    )
}

export default AddToCartButton