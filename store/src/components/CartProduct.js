import Button from 'react-bootstrap/Button'
import { CartContext } from '../CartContext'
import { useContext } from 'react'
import addDecimal from '../utils/addDecimal'

function CartProduct(props){
    const cart = useContext(CartContext)
    const id = props.id
    const quantity = props.quantity
    const productData = cart.getProductData(id)
    


    return (
        <>  
            <h3>{productData.title} {productData.subtitle}</h3>
            <p>{quantity} box total</p>
            <p>{(quantity * addDecimal(productData.price)).toFixed(2)}$</p>
            <Button size='sm' onClick={()=> cart.deleteFromCart(id)}>Remove</Button>
            <hr></hr>
        </>
    )

}

export default CartProduct