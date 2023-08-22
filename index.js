const express = require('express');
const cors = require('cors');
const app = express();
//for token use 
const Jwt =require('jsonwebtoken');

//this key nee to secret
// we make token through the below key 
// if any body know this key then he make token
const jwtKey='e-mobile';

require('./db/config');
const User=require('./db/User');
const Product = require('./db/Product');

// const connectDb = async()=>
// {
//     mongoose.connect('mongodb://localhost:27017/e-Comm');
//     const productSchema=new mongoose.Schema({});
//     const product = mongoose.model('product',productSchema);
//     const data= await product.find();
//     console.log(data);
// }

const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
//for midleware
app.use(express.json());
app.use(cors());

app.post('/register',async(req,res)=>
{
    try
    {
         // before the midleware adding
   // res.send('api in progress')
   // after the midleware adding
   //res.send(req.body)
   //for better work make async
   // the below functions for large amount data
   let user = new User(req.body)
   let result= await user.save();

   //for delete password 1st convert to Obj and then delete password now API will not shows the password
   result=  result.toObject();
   delete result.password;
    //this jwt sign is builton function
            //takes 2 param 1 expiry param is opional and callback function
            Jwt.sign({result} , jwtKey,{expiresIn:'2h'},(err,token)=>
            {
                if(err)
                {
                    res.send({result:'Some thing went wrong  , please try later'}).json();

                }
                res.send({result,auth:token});
            })

    }
    catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send({ error: "An error occurred" });
    }
   
})

app.post('/login',async(req,res)=>{
    try
    {
         // res.send(req.body)
    console.log(req.body);
    if(req.body.email && req.body.password)
    {
        let user = await User.findOne(req.body).select("-password");
        if(user)
        {
            //this jwt sign is builton function
            //takes 2 param 1 expiry param is opional and callback function
            Jwt.sign({user} , jwtKey,{expiresIn:'2h'},(err,token)=>
            {
                if(err)
                {
                    res.send({result:'Some thing went wrong  , please try later'}).json();

                }
                res.send({user,auth:token});
            })
        }
        else
        {
            res.send({result:'No such user found'}).json();
        }
    }
    else
    {
                //the below result is just a key
        res.send({result:'Enter Complete Info'}).json();
    }   

    }
    catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send({ error: "An error occurred" });
    }
   
})
//Add product Route
app.post("/add-product",vrifyToken ,async(req,res)=> 
{
    try
    {
        product=new Product(req.body);
        let result = await product.save();
        res.send(result);
    }
    catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send({ error: "An error occurred" });
    }
    
})

//Products show Note: we are using here the product model no need new model
app.get("/products",vrifyToken,async(req,res)=>
{
    try
    {
        let products= await Product.find();
        if(products)
        {
            res.send(products);
        }
        else
        {
                    //the below result is just a key
            res.send({result:"No Products found"}).json();
        }
    }
    catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send({ error: "An error occurred" });
    }
})
//delete route
app.delete("/product/:id",vrifyToken,async(req,res)=>
{
    try
    {
        
    }
    catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send({ error: "An error occurred" });
    }
    const result = await Product.deleteOne({_id:req.params.id})
    res.send(result);
});

//for single product route of the the above in this route same but method is diff so no issue

app.get('/product/:id',vrifyToken, async (req, res) => {
    try {
        let result = await Product.findOne({ _id: req.params.id });
        if (result) {
            res.send(result);
        } else {
            res.status(404).send({ error: "No record found" }).json();
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send({ error: "An error occurred" });
    }
});

app.put('/product/:id',vrifyToken,async(req,res)=>
{
    try
    {
        let result = await Product.updateOne(
            {
                _id:req.params.id
            },
            {
                // this will get data and will update with given id which 1st abject 
                $set:req.body
            })
            if(result)
            {
                
                res.send(result);
    
            }
            else
            {
                res.send({result:"No data found"})
            }
            console.log(result);
    }
    catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send({ error: "An error occurred" });
    }
})
app.get("/search/:key",vrifyToken,async(req,res)=>{
    try
    {
        let result = await Product.find({
            "$or":[
                // this will show any charectar which name have
                {name:{$regex:req.params.key}},
                //so now this will show charectar of name and company
                {price:{$regex:req.params.key}}
            ]
        });
        res.send(result);
    }
    catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send({ error: "An error occurred" });
    }
})
// this function for middelware which alwasy three prams
function vrifyToken(req,res,next)
{
    try
    {
        let token = req.headers['authorization']
        if(token)
        {
           // the split function is for to split token from other comming bearer
           //this will amke arry 
           //and we will take index 1 is a tokan
            token =token.split(' ')[1];
    
            // this will verify token
            // take params and 1 call back func
            Jwt.verify(token,jwtKey,(err,valid)=>
            {
                if(err)
                {
                    res.status(401).send({result:"Please provide valid token"})
                }
                else
                {
                   // this allow you to continue the process
                   //this the main pilor
                    next();
                }
    
            })
        }
        else
        {
            res.status(403).send({result:"Please add token with Headers"});
        }
    }
    catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send({ error: "An error occurred" });
    }
}

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})