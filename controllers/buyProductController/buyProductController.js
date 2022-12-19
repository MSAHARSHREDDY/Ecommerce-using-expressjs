const {buyProductModel}=require("../../models/buyProductModel")

const buyProduct=async(req,res)=>
{
    try
    {
        const doc=new buyProductModel({
            productId:req.body.productId,
            transactionId:req.body.transactionId,
            vendorId:req.body.vendorId,
            storeId:req.body.storeId,
            customerId:req.body.customerId
        })
        const result=await doc.save()
        res.send({"status":"200","message":"success",data:result})
    }
    catch(err)
    {
       res.send({"status":"400","message":err.message})
    }
}
module.exports={buyProduct}