const mongoose = require('mongoose');

const productSchema =new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    company:String,
    imei1:String,
    imei2:String,
    details:String

});
module.exports=mongoose.model('products',productSchema)