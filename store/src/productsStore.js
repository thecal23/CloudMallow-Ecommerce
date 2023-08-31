//banana split marshmallow price_1NIOkBC0WYouLypicgNPQuIK
//framboise chocolat marshmallow price_1NIOl8C0WYouLypiiG9FNPGr
//cotton candy marshmallow price_1NIOljC0WYouLypiVFmTPTGP

const productsArray = 
[
    {
        id: 'price_1NIOkBC0WYouLypicgNPQuIK',
        title: 'Banana Split Marshmallow',
        price: 4.99,
        img: "./images/banana-split.jpg"
    },
    {
        id: 'price_1NIOl8C0WYouLypiiG9FNPGr',
        title: 'Framboise Chocolat Marshmallow',
        price: 3.99,
        img: './images/framboise-chocolat.jpg'
    },
    {
        id: 'price_1NIOljC0WYouLypiVFmTPTGP',
        title: 'Cotton Candy Marshmallow',
        price: 9.99,
        img: './images/cotton-candy-marshmallow.jpg'
    }
];

function getProductData(id){
    let productData = productsArray.find(product => product.id === id)

    if(productData == undefined){
        console.log("Product data does not exist for ID "+id)
        return undefined
    }

    return productData;
}

export {productsArray, getProductData}