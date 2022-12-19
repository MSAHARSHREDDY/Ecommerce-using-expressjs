const {userModel}=require("../../models/userModel")
 const nodemailer=require("nodemailer")
 const randomstring=require("randomstring")


 const sendRestPasswordMail=async(name,email,token)=>
 {
    try
    {
        const transporter=nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:process.env.emailUser,
                pass:process.env.emailPassword
            }

        })
        const mailOptions=
        {
            from:process.env.emailUser,
            to:email,
            subject:"For Reset Password",
            html:'<p> Hii '+name+' Please copy the link and <a href="http://localhost:3000/api/resetPassword?token='+token+'"> reset your password </a>'

        }
        transporter.sendMail(mailOptions,function(error,info){
                if(error)
                {
                    console.log(error)
                }
                else
                {
                    console.log("mail has been sent ",info.response)
                }
        })
    }
    catch(error)
    {
        res.send({"status":"400","message":"failed"})

    }
 }


 //forgot password
 const forgotPassword=async(req,res)=>{
    try
    {
        const email=req.body.email
        const userData=await userModel.findOne({email:email})
        if(userData)
        {
            const randomStringInfo=randomstring.generate()
            const data=await userModel.updateOne({email:email},{$set:{token:randomStringInfo}})
            sendRestPasswordMail(userData.name,userData.email,randomStringInfo)
            res.send({"status":"400","message":"please check your inbox mail and reset your password"})
        }
        else
        {
            res.send({"status":"400","message":"This email doesnot exist"})
        }
    }
    catch(err)
    {
        res.send({"status":"400","message":"failed to update password"})
    }
 }
 module.exports={forgotPassword}