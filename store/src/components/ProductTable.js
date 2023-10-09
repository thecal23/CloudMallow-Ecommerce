import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input-field'
import addDecimal from '../utils/addDecimal';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/submit', {
        mode: 'cors',
        credentials: 'include'
      });
      const data = await response.json()
      if (data.url === "http://localhost:3000/admin/login"){
        window.location.href = data.url
      } else if (response.ok) {
        setProducts(data);
        console.log(products)
      } else {
        console.log('Failed to fetch products');
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setShowModal(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await fetch(`http://localhost:4000/api/submit/${productId}`, {
        method: 'DELETE',
      });
      fetchProducts();
      console.log('Product deleted successfully');
    } catch (error) {
      console.log('Failed to delete product');
    }
  };

  const handleUpdateProduct = async () => {
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);
    console.log(editingProduct._id)
    try {
      await fetch(`http://localhost:4000/api/submit/${editingProduct._id}`, {
        method: 'PUT',
        body: formData,
      });
      fetchProducts();
      setShowModal(false);
      console.log('Product updated successfully');
    } catch (error) {
      console.log('Failed to update product');
    }
  };

  const handleSelectedProduct = async (product) => {
    console.log("we inside handleSelectedProduct")
    try {
      const response = await fetch('http://localhost:4000/api/chosen-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if(response.ok){
        console.log('Product chosen for the front end')
      } else {
        console.log("Failed to select product")
      }
    } catch (error){
      console.log("Error: ", error.message)
    }
  }

  const handleGetProduct = async () => {
    console.log("we inside handle get product")
    try {
      const response = await fetch('http://localhost:4000/api/chosen-product', {
        method: 'GET'
      })
      const data = await response.json()
      if (response.ok){
        console.log("data: ",data[0].name)
      } else {
        console.log("Error in get product")
      }
    } catch (error){
      console.log("Error: ", error.message)
    }
  }

  const handleAddProduct = async () => {
    let parsedPrice = price
    parsedPrice = parseInt(parsedPrice.replace(".",""))

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', parsedPrice);
    formData.append('image', image);
    console.log(formData)

    try {
    
    const backendResponse = await fetch('http://localhost:4000/api/submit', {
      method: 'POST',
      body: formData,
    });
    if(backendResponse.ok){
      fetchProducts();
      setShowModal(false);
      console.log('Product added successfully');
    } else {
      console.log('Failed to add product to backend');
    }
  } catch (error) {
    console.log('Error:', error.message);
    // Handle the error or show an error message to the user
  }
    
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setName('');
    setPrice('');
    setImage(null);
  };

  return (
    <div>
      <h2>Product List</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{addDecimal(product.price)}$</td>
              <td>
                <Button onClick={() => handleEditProduct(product)} variant="info">
                  Edit
                </Button>
                <Button onClick={() => handleDeleteProduct(product._id)} variant="danger">
                  Delete
                </Button>
                <Button onClick={() => handleSelectedProduct(product)} variant="success">
                  Select Display Product
                </Button>
                <Button onClick={() => handleGetProduct()} variant="warning">Get Display Product</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button onClick={() => setShowModal(true)} variant="success">
        Add New Product
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? 'Edit Product' : 'Add New Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange={handleNameChange} />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <CurrencyInput  value={price} prefix="$" onValueChange={(value) => {setPrice(value); console.log(value)}} />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={editingProduct ? handleUpdateProduct : handleAddProduct}>
            {editingProduct ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductTable;
