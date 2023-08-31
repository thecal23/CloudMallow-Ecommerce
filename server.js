//sk_test_51NIOh0C0WYouLypiG4kBFMczCjgNGr1c9tiJZkfOXlYFhx4hPNHYk5qHvmfVsoJF1rhENOHJbsX7KPX6ldnz0pYs00k6d2WSa0

const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const {Product, Orders, Admin, Customers} = require('./models/schemas')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv/config')
var cors = require('cors')
const stripe = require('stripe')('sk_test_51NIOh0C0WYouLypiG4kBFMczCjgNGr1c9tiJZkfOXlYFhx4hPNHYk5qHvmfVsoJF1rhENOHJbsX7KPX6ldnz0pYs00k6d2WSa0')
const passport = require('passport')
const passportLocal = require("passport-local").Strategy
const cookieParser = require("cookie-parser")
const bcrypt = require("bcryptjs")
const session = require("express-session")
const uuid = require('uuid')


const app = express()

//middleware
app.use(express.static("uploads"))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors({
  origin: "http://localhost:3000", //<-- location of the react app we're connecting to
  credentials: true
}))
app.use(session({
  secret: "secretcode",
  resave: true,
  saveUninitialized: true
}))
app.use(cookieParser("secretcode"))
app.use(passport.initialize())
app.use(passport.session())
require('./passportConfig')(passport)


//routes
app.post("/admin/login", (req,res,next)=> {
  passport.authenticate("local", (err, user,info) => {
    if(err) throw err
    if(!user) res.send("No user exists")
    else {
      req.logIn(user, err => {
        if (err) throw err
        res.send("Successfully Authenticated")
        console.log(req.user)
      })
    }
  })(req,res,next)
})

//register
app.post("/admin/register", async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({ username: req.body.username });
    if (existingAdmin) {
      res.send("Admin already exists");
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newAdmin = new Admin({
        username: req.body.username,
        password: hashedPassword,
      });
      await newAdmin.save();
      res.send("User Created");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500); // Handle the error appropriately
  }
});


app.get("/admin/user", (req,res)=>{
  console.log(req)
  res.send(req.user) // the req.user stores the entire user that has been authenticated
})

//Checkout creation
app.post("/checkout", async (req,res) => {
    
    console.log("checkout", req.body)
    const items = req.body.items
    let lineItems = []
    items.forEach((item)=> {
        lineItems.push(
            {
                price_data: {
                  currency: 'cad',
                  product_data: {
                    name: item.name
                  },
                  unit_amount: item.price
                },
                quantity: item.quantity
            }
        )
    })

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:3000/cancel",
        metadata: {
          orderId: `ORDER-${uuid.v4()}`
        }
    })


    console.log("Current checkout session object from checkout page:", session)
    
    
    const newCheckoutSession = new Orders({
      checkoutSessionId: session.id
    })
    await newCheckoutSession.save()


    res.send(JSON.stringify({
        success_url: session.success_url,
        url: session.url,
        checkoutSessionId: session.id
    }))
})

const dbOptions = {useNewUrlParser:true, useUnifiedTopology:true}
mongoose.connect(process.env.DB_URI, dbOptions)
.then(()=> console.log('DB connected'))
.catch(err => console.log(err))


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage})


// Fetch Products
app.get('/api/submit', (req, res) => {
    Product.find({})
      .then((data, err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: 'Failed to fetch products' });
        } else {
            res.json(data);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Internal Server Error');
      });
  });
  
  // Add products
  app.post('/api/submit', upload.single('image'), async (req, res) => {
    const { name, price } = req.body;
    const image = req.file;

    console.log(req.body.name)
  
    // Process the form data and save it to the database
    // Example: Save formData to MongoDB using Mongoose

    const stripeProduct = await stripe.products.create({
      name: name,
      default_price_data: {
        currency: 'cad',
        unit_amount_decimal: price
      },
      images: [image.filename],
    });

    console.log("Product added to stripe", stripeProduct)
    console.log('PRODUCT ID', stripeProduct.id)
  
    const newMarshmallowProduct = new Product({
      name,
      price,
      image: image.filename,
      stripeProductId: stripeProduct.id,
      priceId: stripeProduct.default_price
    });
  
    newMarshmallowProduct
      .save()
      .then(() => {
        res.sendStatus(200);
        console.log('saved to db', req.file.filename, req.body) // Send a success response
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500); // Send an error response
      });
  });
  

  // Update Products
  app.put('/api/submit/:productId', upload.single('image'), async (req, res) => {
    const productId = req.params.productId;
    const { name, price } = req.body;
    const image = req.file;
    console.log(price)
    const foundProducts = await Product.find({_id: productId},{stripeProductId: 1})
    const stripeProductId = foundProducts[0].stripeProductId
    const new_price = await stripe.prices.create({product: stripeProductId, unit_amount: price, currency: 'cad', active: true})
    const product = await stripe.products.update(stripeProductId, {name: name, default_price: new_price.id});
    // gotta deactivate the old prices    

    // Find the product by its ID in the database
    Product.findByIdAndUpdate(productId, {
      name,
      price,
      image: image ? image.filename : undefined,
    })
      .then(() => {
        res.sendStatus(200);
        console.log(productId)
        console.log(name)
        console.log('Product updated successfully');
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500); // Send an error response
      });
  });


  //Delete Products
  app.delete('/api/submit/:productId', async (req,res) => {
    
    const productId = req.params.productId
    console.log("product mongo id : ",productId)
    const foundProducts = await Product.find({_id: productId},{stripeProductId: 1})
    
    console.log("stripe id : ", foundProducts[0].stripeProductId)

    /* const deleted = await stripe.products.del(
      foundProducts[0].stripeProductId
    ); */ //can't delete a product on Stripe if it has a price
    const product = await stripe.products.retrieve(foundProducts[0].stripeProductId);
    const priceObject = await stripe.prices.retrieve(product.default_price)
    console.log("Price object: ", priceObject)
    console.log("Price ID :", product.default_price)
    return;
    //const customers = await stripe.customers.list({limit: 3})
    //console.log("customers: " , customers)
    
    //await stripe.prices.update(product.default_price,{active: false,})
    
    
    
    Product.findOneAndDelete({_id:productId})
    .then(() => {
      res.sendStatus(200)
      console.log('Product deleted')
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
  })

  // Fetch and Update Orders and Create new Customers
  app.get("/order-details", async (req,res) => {
    try {
      const checkoutSessions = await Orders.find()

      
      
      for (const session of checkoutSessions){
        const checkoutSessionObject = await stripe.checkout.sessions.retrieve(session.checkoutSessionId, {expand: ["line_items"]})
        const amount_total = (checkoutSessionObject.amount_total)/100
        //console.log("checkoutSessionId: ", session.checkoutSessionId)
        //console.log("Payment Status: ", checkoutSessionObject.payment_status)
        //console.log("Amount total:", amount_total)
        
        

        await Orders.findOneAndUpdate({checkoutSessionId: session.checkoutSessionId},
          {
            paymentStatus: checkoutSessionObject.payment_status,
            amountTotal: amount_total
          })

        const customerDetails = checkoutSessionObject.customer_details
        const existingCustomer = await Customers.findOne({email: customerDetails.email})
        if (existingCustomer){
          console.log("Customer already exists")
        } else {
          const newCustomer = new Customers({
            fullName: customerDetails.name,
            email: customerDetails.email,
            country: customerDetails.address.country,
            postalCode: customerDetails.address.postal_code
          })
          await newCustomer.save()
        }
        
      } 
      const updatedCheckoutSessions = await Orders.find()
      console.log("updated : ",updatedCheckoutSessions)
      res.json(updatedCheckoutSessions)
    } catch (error){
        res.status(500).json({ error: "Failed to fetch checkout details"})
      }
  })

  //Fetch Customers
  app.get("/customers-details", async (req,res) => {
    try {
      const customersDetails = await Customers.find()
      /* const customersDetails = [] */

      /* for (const customer of customers){
        const customersDetailsObject = await stripe.checkout.sessions.retrieve(session.checkoutSessionId)
        const amount_total = (checkoutSessionObject.amount_total)/100
        console.log("checkoutSessionId: ", session.checkoutSessionId)
        console.log("Payment Status: ", checkoutSessionObject.payment_status)
        console.log("Amount total:", amount_total)
        const detail = {
          checkoutSessionId: session.checkoutSessionId,
          paymentStatus: checkoutSessionObject.payment_status,
          amountTotal: amount_total
        }
        checkoutDetails.push(detail)
      }  */
      res.json(customersDetails)
    } catch (error){
        res.status(500).json({ error: "Failed to fetch checkout details"})
      }
  })

  //Success Page
  app.get("/success-page", async (req,res) => {
    try{

      const checkoutSessionId = req.header("checkout-session-id")
      const session = await stripe.checkout.sessions.retrieve(checkoutSessionId);
      const amount_total = ((session.amount_total)/100).toFixed(2)
      // await Orders.findOneAndUpdate({checkoutSessionId: checkoutSessionId},
      //   {
      //     orderId: session.metadata.orderId,
      //     paymentStatus: session.payment_status,
      //     amountTotal: amount_total
      //   })
      
      console.log("checkout session object of success page : ",session)
  
      res.json(session)
    } catch(error){
      res.status(500).json({error:"Failed to fetch checkout details"})
    }
  })

const port = process.env.PORT || 4000
app.listen(port, ()=> console.log("listening on port 4000"))