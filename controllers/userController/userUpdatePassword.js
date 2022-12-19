const {userModel}=require("../../models/userModel")
const bcrypt=require("bcrypt")
//update password after user logedin
const updatePassword=async(req,res)=>
{
    try
    {
        const user_id=req.body.user_id
        const password=req.body.password
        const data=await userModel.findOne({_id:user_id})
        if(data)
        {
            const hashPassword=await bcrypt.hash(password,10)
            const userData=await userModel.findByIdAndUpdate({_id:user_id},{$set:{
                password:hashPassword
            }})
            res.send({"status":"200","message":"password updated successfully"})
        }
        else
        {
            res.send({"status":"404","message":"user Id doesnot exit"})
        }
    }
    catch(err)
    {
        console.log(err.message)
    }
}
module.exports={updatePassword}