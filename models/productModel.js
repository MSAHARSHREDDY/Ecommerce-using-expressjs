const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({
    vendor_id:{type:String,required:true},
    store_id:{type:String,required:true},
    productName:{type:String,required:true},
    price:{type:String,required:true},
    discount:{type:String,required:true},
    category_id:{type:String,required:true},
    sub_category_id:{type:String,required:true},
    productImage:{type:Array,required:true,validate:[arrayLimit,"you can pass only 5 product images"]}

})

function arrayLimit(val)
{
    return val.length<=5
}

const productModel=mongoose.model("product",productSchema)
module.exports={productModel}