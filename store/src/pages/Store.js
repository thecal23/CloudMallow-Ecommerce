import ProductCards from '../components/ProductCards';
import NavbarComponent from '../components/Navbar';
import {Button, Navbar, Nav} from 'react-bootstrap'

function Store(){
    return(
        <>
            <div>
                <NavbarComponent />
            </div>
            <div className="row navbar-bg-gradient vh-100">
                    
                    <div className="col d-flex flex-column justify-content-center align-items-center p-5">
                        <h1 className="brand">CloudMallow</h1>
                        <h2 className="fluffy">Indulge in a World of Fluffy Delights</h2>
                        <span className="px-5 py-2">Are you ready to elevate your snacking experience? At CloudMallow, we're on a mission to bring a touch of magic to your parties and everyday moments. Our homemade custom marshmallows are more than just treats; they're moments of pure bliss.</span>
                        <button className="btn btn-danger">View Menu</button>
                    </div>
                    {/* <div className="col-6 d-flex justify-content-center align-items-center">
                        <img src="../../images/cotton-candy-marshmallow1.png"/>
                    </div> */}
                
                
            </div>
            <ProductCards />
            {/* <div id="aboutus"><h1>About Us</h1></div>                 */}
        </>
    )
}

export default Store;