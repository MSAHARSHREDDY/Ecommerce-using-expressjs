const {userModel}=require("../../models/userModel")
const bcrypt=require("bcrypt")





//login form
const userLogin=async(req,res)=>
{
    try
    {
        const email=req.body.email
        const password=req.body.password
    const userData=await userModel.findOne({email:email})
    console.log(userData)
        if(userData!=null)
        {
            const passwordMatch=await bcrypt.compare(password,userData.password)
            if(email===email && passwordMatch)
            {
                const accesstokenData=await userData.generateAccessToken()//function calling it goes to userModel.js
                const refreshTokenData=await userData.generateRefreshToken()//function calling it goes to userModel.js
                
                //console.log(tokenData)
               const userResult=
               {
                userName:userData.name,
                userEmail:userData.email,
                userPhoneNo:userData.mobile,
                accessToken:accesstokenData,
                refreshToken:refreshTokenData
               }
                res.send({"status":"200","message":"success",data:userResult})
            }
            else
            {
                res.send({"status":"400","message":"You have entered wrong password or email"})
            }
        }
        else
        {
            res.send({"status":"404","message":"you are not a registered user"})
        }

    }
    catch(err)
    {
        res.status(400).send(err.message)  
    }
}
module.exports={userLogin}