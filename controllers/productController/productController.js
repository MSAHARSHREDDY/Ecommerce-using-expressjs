const {productModel}=require("../../models/productModel")
const categoryController=require("../../controllers/categoryController/categoryController")
const storeController=require("../../controllers/storeController/storeController")
const addProduct=async(req,res)=>
{
    try
    {
        var arrImages=[]
        for(let i=0;i<req.files.length;i++)
        {
            arrImages[i]=req.files[i].filename
        }
           

        var product=new productModel({
            vendor_id:req.body.vendor_id,
            store_id:req.body.store_id,
            productName:req.body.productName,
            price:req.body.price,
            discount:req.body.discount,
            category_id:req.body.category_id,
            sub_category_id:req.body.sub_category_id,
            productImage:arrImages
        })
        const result=await product.save()
        res.send({"status":"200","message":"success",productDetails:result})

    }
    catch(err)
    {
        res.send({"status":"400","message":err.message})
    }
}

//get products
const getProducts=async(req,res)=>
{
    try
    {
        var send_data=[]
        var category_data=await categoryController.getCategory()
        if(category_data.length>0)
        {
            for(let i=0;i<category_data.length;i++)
            {
                var product_data=[]
                var category_id=category_data[i]["_id"].toString()
                console.log(category_id)
                var category_product=await productModel.find({category_id:category_id})
                if(category_product.length>0)
                {
                    for(let j=0;j<category_product.length;j++)
                    {
                       var store_data=await storeController.get_store(category_product[j]["store_id"])
                       product_data.push(
                        {
                            "product_name":category_product[j]["productName"],
                            "Images":category_product[j]["productImage"],
                            "store_address":store_data["address"]
                        }
                       )
                    }
                }
                // else
                // {
                //     //If you doesnot find products it means products are empty
                //  res.send({"status":"200","message":"product Details",data:product_data}) 
                // }
                send_data.push({
                    "category":category_data[i]["category"],
                    "product":product_data
                })

            }
            res.status(200).send({"success":"200","message":"product details",data:send_data})
        }
        else
        {
            //If you doesnot find categories
            res.send({"status":"200","message":"product Details",data:send_data}) 
        }
    }
    catch(err)
    {
        res.send({"status":"400","message":err.message})
    }
}


const searchProduct=async(req,res)=>
{
    try
    {
        var search=req.body.search
        var productData=await productModel.find({
            "productName":{$regex:".*"+search+".*",$options:"i"}
        })
        if(productData.length>0)
        {
            res.status(200).send({"message":"success",data:productData})
        }
        else
        {
            res.status(400).send({"message":"products not found"})
        }
    }
    catch(err)
    {
        console.log(err)
        res.send({"status":"400","message":err.message})
    }
}

//send data with pagination and sorted form
const paginate=async(req,res)=>
{
    try
    {
        var page=req.body.page
        var sort=req.body.sort
        var productData
        if(sort)
        {
            
        }
        else
        {
            productData=await productModel.find().limit(3)
            res.send({"status":"200","message":"success",data:productData})
        }
    }
    catch(err)
    {
        res.send({"status":"400","message":"failed","message":err.message})
    }
}

module.exports={addProduct,getProducts,searchProduct,paginate}