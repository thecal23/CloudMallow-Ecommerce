import {createContext, useEffect, useState} from 'react'
import addDecimal from './utils/addDecimal'

export const CartContext = createContext({
    productData: [],
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
    getProductData: () => {}
})

export function CartProvider({products, children}) {

    function getProductData(id){
        for(let i = 0; i < products.length; i++){
            let currentProduct = products[i]
            if(currentProduct._id == id){
                return currentProduct
            }
        }
    }


    useEffect(()=>{
        console.log(products, 'products props data passed success')
    }, [products])

    const [cartProducts, setCartProducts] = useState([])

    function getProductQuantity(id) {
        const quantity = cartProducts.find(product => product.id === id)?.quantity

        if(quantity === undefined){
            return 0;
        }

        return quantity
    }

    function addOneToCart(id){
        const quantity = getProductQuantity(id)
        const productData = getProductData(id)
        const productName = productData.title
        const productPrice = productData.price

        if (quantity === 0){
            setCartProducts
            (
                [
                    ...cartProducts,
                    {
                        id: id,
                        name: productName,
                        price: productPrice,
                        quantity: 1
                    }
                ]
            )
        } else {
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id                             //if condition
                    ? {...product, quantity: product.quantity +1} // if statement is true
                    : product                                     // if statement is false
                )
            )
        }
    }

    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);

        if(quantity == 1){
            deleteFromCart(id)
        } else {
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id
                    ? {...product, quantity: product.quantity -1}
                    : product
                )
            )
        }
    }

    function deleteFromCart(id){
        //[] if an object meets a condition, add the object array
        setCartProducts(
            cartProducts => 
            cartProducts.filter(currentProduct => {
                return currentProduct.id != id
            }) 
        )
    }

    function getTotalCost(){
        let totalCost = 0
        cartProducts.map((cartItem)=> {
            const productData = getProductData(cartItem.id)
            totalCost += (addDecimal(productData.price) * cartItem.quantity)
        })
        return totalCost

    }
    
    const contextValue = {
        productData: products,
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
        getProductData
    }
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;