  const mongoose=require("mongoose")
  const buyProductSchema=new mongoose.Schema({
    productId:{type:String,required:true},
    transactionId:{type: Number,
        default : Math.floor(100000+Math.random()*900000),
        index: { unique: true }},
    vendorId:{type:String,required:true},
    storeId:{type:String,required:true},
    customerId:{type:String,required:true}
  })
  const buyProductModel=mongoose.model("buyProduct",buyProductSchema)
  module.exports={buyProductModel}