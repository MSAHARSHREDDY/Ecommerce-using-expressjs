const mongoose=require("mongoose")
const subCategorySchema=new mongoose.Schema({
    category_id:{type:String,required:true},
    sub_category:{type:String,required:true}
})
const subCategoryModel=mongoose.model("subCategory",subCategorySchema)
module.exports={subCategoryModel}