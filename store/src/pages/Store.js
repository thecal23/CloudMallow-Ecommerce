import ProductCards from '../components/ProductCards';
import NavbarComponent from '../components/Navbar';

function Store(){
    return(
        <>
            <NavbarComponent />
            <h1 align="center" className="p-3">Welcome to CloudMallow!</h1>
                <ProductCards />                
        </>
    )
}

export default Store;