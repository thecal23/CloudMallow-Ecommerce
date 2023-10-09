const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: String,
    price: Number, //price in cents
    image: String,
    stripeProductId: String,
    priceId: String,
    display: Boolean,
    size: Number,
})

const ordersSchema = new Schema({
    checkoutSessionId: {type: String, required: true, unique: true},
    orderId: String,
    orderDate: String,
    customerDetails:[{
        fullName: String,
        email: String,
        address: String,
        city: String,
        country: String,
        postalCode: String,
        state: String,
    }],
    itemsPurchased:[{
        itemName: String,
        quantity: Number,
        price: Number,
        currency: String
    }],
    transactions:[{
        paymenIntentId: String,
        transactionDate: String,
        amount: Number,
        payment_status: String,
        payment_method: String,
    }],
    paymentStatus: String,
    amountTotal: Number //amount in cents
})

const customersSchema = new Schema({
    fullName: String,
    email: String,
    country: String,
    postalCode: String
})

const adminSchema = new Schema({
    username: String,
    password: String
})

const Product = mongoose.model("Marshmallow", productSchema, 'marshmallow_flavors')
const Orders = mongoose.model("MarshmallowOrders", ordersSchema, 'marshmallow_orders')
const Admin = mongoose.model("MarshmallowAdmins", adminSchema, 'marshmallow_admins')
const Customers = mongoose.model("MarshmallowCustomers", customersSchema, 'marshmallow_customers')

module.exports = {
    Product,
    Orders,
    Admin,
    Customers
}