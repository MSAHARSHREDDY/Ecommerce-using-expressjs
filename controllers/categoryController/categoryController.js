const {categoryModel}=require("../../models/categoryModel")

const addCategory=async(req,res)=>
{
    try
    {
        const data=await categoryModel.findOne({category:req.body.category})
        if(data)
        {
            res.send({"status":"400","message":data.category+" category already"})
        }
        else
        {
            const doc=await new categoryModel({
                category:req.body.category
            })
            const result=await doc.save()
            res.send({"status":":200","message":"success",data:result})
        }
       
    }
    catch(err)
    {
        res.send({"status":":400","message":err.message})
    }
}

const getCategory=async(req,res)=>{
    try
    {
        return categoryModel.find()
    }
    catch(err)
    {
        res.send({"status":"400","message":err.message})
    }
}

module.exports={addCategory,getCategory}