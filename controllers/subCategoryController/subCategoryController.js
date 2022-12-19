const {subCategoryModel}=require("../../models/subCategoryModel")


const createSubCategory=async(req,res)=>
{
    try
    {
        const sub_category=req.body.sub_category
        const data=await subCategoryModel.findOne({sub_category:sub_category})
        console.log(data)
        if(data)
        {
            res.send({"status":"400","message":data.sub_category+" sub category already"})
        }
        else
        {
            const doc=await new subCategoryModel({
                category_id:req.body.category_id,
                sub_category:req.body.sub_category
            })
            const result=await doc.save()
            res.send({"status":"200","message":"success",data:result})
        }
    }
    catch(err)
    {
        console.log(err)
    }
}
module.exports={createSubCategory}