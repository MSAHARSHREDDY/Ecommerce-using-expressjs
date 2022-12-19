const {userModel}=require("../../models/userModel")
const bcrypt=require("bcrypt")

const resetPassword=async(req,res)=>
{
    try
    {
        const token=req.query.token
        //left token is taken from database and right token is user token
        const tokenData=await userModel.findOne({token:token})
        if(tokenData)
        {
            const password=req.body.password
            const hashPassword=await bcrypt.hash(password,10)
            const userData=await userModel.findByIdAndUpdate({_id:tokenData._id},{$set:{
                password:hashPassword,token:""
            }},{new:true})
            res.send({"status":"200","message":"password has been reset successfully",data:userData})

        }
        else
        {
            res.status(400).send({success:false,msg:"This link has been expired"})
        }
    }
    catch(err)
    {
        res.status(400).send({success:false,msg:err.message})
    }
}
module.exports={resetPassword}