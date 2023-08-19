const express = require('express');
const cors = require('cors');
const app = express();
require('./db/config');
const User=require('./db/User');

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
   res.send(result);

})

app.post('/login',async(req,res)=>{
    // res.send(req.body)
    console.log(req.body);
    if(req.body.email && req.body.password)
    {
        let user = await User.findOne(req.body).select("-password");
        if(user)
        {
            res.send(user);
        }
        else
        {
            res.send('No such user found')
        }
    }
    else
    {
        res.send('Enter Complete Info')
    }
    // this will show one record but will not show the password
    
    

})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})