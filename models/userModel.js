const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    image:{type:String,required:true},
    mobile:{type:Number,required:true},
    type:{type:Number,required:true},
    accessTokensValue:[
        {
            accessToken:{type:String,required:true}
        }
    ],
    refreshTokensValue:[
        {
            refreshToken:{type:String,required:true}
        }
    ],
    token:{type:String,default:""}

})

//we are generating access token refer to thapa Technical[mern stack video 15]
//access Token
userSchema.methods.generateAccessToken=async function()
{
  try
    {
        //It is going to redirect to redirect to userLogin.js
        let MyToken=jwt.sign({_id:this._id},process.env.accessTokenSecretKey,{expiresIn:"24h"})
        //console.log(MyToken)
        this.accessTokensValue=this.accessTokensValue.concat({accessToken:MyToken})
        await this.save()
        return MyToken
    }
    catch(err)
    {
        console.log(err.message)
    }
}


//refresh Token
userSchema.methods.generateRefreshToken=async function()
{
    try
    {
        let MyToken=jwt.sign({_id:this._id},process.env.refreshTokenSecretKey,{expiresIn:"24h"})
        this.refreshTokensValue=this.refreshTokensValue.concat({refreshToken:MyToken})
        await this.save()
        return MyToken
    }
    catch(err)
    {
        console.log(err.message)
    }
}


const userModel=mongoose.model("user",userSchema)
module.exports={userModel}