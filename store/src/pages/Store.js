import ProductCards from '../components/ProductCards';
import NavbarComponent from '../components/Navbar';
import {Button, Navbar, Nav} from 'react-bootstrap'
import {TbEggOff} from 'react-icons/tb'
import {LuMilkOff} from 'react-icons/lu'
import {FaRegGrinTongueSquint} from 'react-icons/fa'
import AddToCartButton from '../components/AddToCartButton';
import Footer from '../components/Footer';
import addDecimal from '../utils/addDecimal';
import { useState, useEffect } from 'react';

function Store(){
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null)

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/submit');
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
                console.log("products data: ", data)
            } else {
                console.log('Failed to fetch products');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts();
        handleGetProduct();
    }, []);

    const handleGetProduct = async () => {
        console.log("we inside handle get product")
        try {
            const response = await fetch('http://localhost:4000/api/chosen-product', {
                method: 'GET'
            })
            const data = await response.json()
            if (response.ok){
                console.log(data[0].image)
                setSelectedProduct(data[0])
            } else {
                console.log("Error in get product")
            }
        } catch (error){
            console.log("Error: ", error.message)
        }
    }

    return(
        <div className="bgGradient">
            {/* {products.length > 0 ? <div>Yes</div> : <div>Nope</div>} */}
            <div className="">
                <div className="container">
                    <NavbarComponent />
                </div>
                <div className="row container mt-3 mx-auto landing-page-xs landing-page-xl">
                    <div className=" mx-auto col d-flex justify-content-center align-items-start order-xl-2">
                        <img className="productImage" src={`http://localhost:4000/uploads/${selectedProduct ? selectedProduct.image : "cloudmallow-logo.jpeg"}`} alt="product image"/>
                    </div>
                    <div className="col d-flex justify-content-center align-items-center">
                        <div className="container1 d-flex flex-column justify-content-center align-items-center justify-content-xl-center align-items-xl-start">
                            <div className="row w-100">                                
                                <h1 className="brand d-flex justify-content-center justify-content-xl-start">{selectedProduct ? selectedProduct.title : "Welcome to CloudMallow the page is loading"}</h1>
                                <h1 className="brand2 d-flex justify-content-center justify-content-xl-start">{selectedProduct ? selectedProduct.subtitle : null}</h1>
                                {/* <span>{selectedProduct ? selectedProduct.name : "Loading"}</span>                                 */}
                            </div>
                            <div className='row w-100 '>
                                <ul className='list-unstyled'>
                                    <li className='product-details'><b>Perfect for Any Occasion: </b>Whether it's a self-indulgent treat or a thoughtful gift, our Assorted Marshmallow Box adds a touch of magic to any moment, making it an ideal choice for sweetening your day or surprising a loved one.</li>
                                    <li className='product-details'><b>Size: </b>Box of {selectedProduct ? selectedProduct.boxSize : "Loading"}</li>
                                </ul>
                            </div>
                            {/* <div className="row w-100">
                                <ul className="d-flex justify-content-around align-items-center list-unstyled">
                                    <li className="emoji-characteristics"><LuMilkOff className="emoji-style" /><br/>Dairy Free</li>
                                    <li className="emoji-characteristics"><TbEggOff className="emoji-style" /><br/>Egg Free</li>
                                    <li className="emoji-characteristics"><FaRegGrinTongueSquint className="emoji-style" /><br/>Delicious</li>
                                </ul>                                
                            </div> */}
                            <div className="row pt-3 button-container">
                                <div className="text-center">
                                    <span className='h-100'><b>{selectedProduct ? addDecimal(selectedProduct.price)  : <div>Loading</div>} $ / box</b></span>
                                    <AddToCartButton />
                                </div>
                            </div>
                        </div>
                    </div>                        
                </div>
                <div className='footer mt-4'>
                    <Footer />
                </div>
            </div>   
        </div>
    )
}

export default Store;