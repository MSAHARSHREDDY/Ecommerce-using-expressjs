const {userModel}=require("../../models/userModel")
const bcrypt=require("bcrypt")

//register
const registerUser=async(req,res)=>
{
    try
    {
        const email=req.body.email
        const userEmail=await userModel.findOne({email:email})
        if(userEmail)
        {
            res.send({"status":"400","message":"email already exists"})
        }
        else
        {
            const hashPassword=await bcrypt.hash(req.body.password,10)
            const userData=new userModel({
                    
                name:req.body.name,
                email:req.body.email,
                password:hashPassword,
                image:req.file.filename,
                mobile:req.body.mobile,
                type:req.body.type
            })
            const result=await userData.save()
            console.log(result)
            res.send({"status":"200",data:result})
        }
    }
    catch(err)
    {
        res.status(400).send(err.message)  
    }
}

module.exports={registerUser}
