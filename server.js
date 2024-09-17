const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/ProductModel');
const app = express();


//middleware 
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Define a route
app.get('/', (req, res) => {
    res.send('Hello Node API Shariq Iqbal');
});

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Shariq');
});

// get product 

app.get('/products', async(req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }

})

//get product find

app.get('/product/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({message: `Cannot find any product with id ${id}`})
        }
        res.status(200).json(product);
    }
    catch(error){
        
        res.status(500).json({ message: error.message }); // Handle errors
    }
})

// Post route to add a product
app.post('/product', async (req, res) => {
    try {
        const product = await Product.create(req.body); // Create product
        res.status(200).json(product); // Send the product details in response
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message }); // Handle errors
    }
});


    //update product 

    app.put('/product/:id' ,async (req,res)=>{
        try{
            const {id} = req.params;
            const product =await Product.findByIdAndUpdate(id,req.body);

            if(!product){
                return res.status(404).json({message: `Cannot find any product with id ${id}`});
            }
            const updateProduct = await Product.findById(id);
            res.status(200).json(updateProduct);
        }
        catch(error){
            res.status(500).json({ message: error.message });
        }
    })

    //remove delete product
    app.delete('/product/:id', async(req,res) =>{

        try{
            const {id} = req.params;
            const product = await Product.findByIdAndDelete(id);
            if(!product){
                return res.status(404).json({message: `Cannot find any product with id ${id}`})
            }
            res.status(200).json(product); 
        }
        catch(error){
            res.status(500).json({ message: error.message });
        }

    });
     



// Start the server
mongoose
    .connect('mongodb+srv://shariqiqbal571:Ws7mjR7ECHCT6vV0@devtamianapi.bd7pq.mongodb.net/Node-Api')
    .then(() => {
        console.log('Connected to MongoDB successfully');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((error) => {
        console.log(error);
    });
