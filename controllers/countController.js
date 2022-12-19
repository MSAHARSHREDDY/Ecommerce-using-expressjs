const {productModel}=require("../models/productModel")
const {userModel}=require("../models/userModel")
const {categoryModel}=require("../models/categoryModel")
const {subCategoryModel}=require("../models/subCategoryModel")
const dataCount=async(req,res)=>
{
    try
    {
        const countData=[]
        const productData=await productModel.find().count()
        const vendorData=await userModel.find({type:1}).count()//here type:1 means it shows only vendor details
        const categoryData=await categoryModel.find().count()
        const subCategoryData=await subCategoryModel.find().count()
        countData.push({
            product:productData,
            vendor:vendorData,
            category:categoryData,
            subCategory:subCategoryData
        })
        res.send({"status":"200","message":"success",data:countData})
    }
    catch(err)
    {
        res.send({"status":"400","message":"failed to get","message":err.message})
    }
}
module.exports={dataCount}