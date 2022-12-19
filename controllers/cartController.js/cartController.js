const {cartModel}=require("../../models/cartModel")

const addToCart=async(req,res)=>
{
    try
    {
        const {productId,price,vendorId,storeId}=req.body
        const doc=new cartModel({
            productId,price,vendorId,storeId
        })
        const result=await doc.save()
        console.log(result)
        res.send({"status":"200","message":"success",data:result})
    }
    catch(err)
    {
        res.send({"status":"200","message":"failed to add cart","message":err.message})
    }
}
module.exports={addToCart}