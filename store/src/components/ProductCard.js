import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { CartContext } from '../CartContext';
import addDecimal from '../utils/addDecimal';


function ProductCard({ product }) {
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
      <Card className="col-9">
        <Card.Body>
          <Card.Img src={`http://localhost:4000/${product.image}`} />
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{addDecimal(product.price)}$</Card.Text>
          {productQuantity > 0 ? (
            <>
              <Form as={Row}>
                <Form.Label column sm="6">
                  In Cart: {productQuantity}
                </Form.Label>
                <Col sm="6">
                  <Button sm="6" onClick={() => cart.removeOneFromCart(product._id)} className="mx-2">
                    -
                  </Button>
                  <Button sm="6" onClick={() => cart.addOneToCart(product._id)} className="mx-2">
                    +
                  </Button>
                </Col>
              </Form>
              <Button variant="danger" onClick={() => cart.deleteFromCart(product._id)} className="my-2">
                Remove from Cart
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={() => cart.addOneToCart(product._id)}>
              Add to Cart
            </Button>
          )}
        </Card.Body>
      </Card>
    );
  }

  export default ProductCard;