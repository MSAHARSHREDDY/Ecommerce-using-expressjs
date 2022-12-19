const express=require("express")


const {registerUser}=require("../controllers/userController/userRegister")
const{userLogin}=require("../controllers/userController/userLogin")
const {updatePassword}=require("../controllers/userController/userUpdatePassword")
const {forgotPassword}=require("../controllers/userController/userForgotPassword")
const { resetPassword } = require("../controllers/userController/userResetPassword")


const {verifyToken}=require("../middleware/auth")
const multer=require("multer")
const path=require("path")

const userRouter=express.Router()

/*-----------------refer to stubborn developers for file upload---------*/
const storage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,"./public/userImages")
    },
    filename:function(req,file,callback)
    {
        console.log(file)
        callback(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
      
    }
})
const upload=multer({storage:storage})
/*-----------------refer to stubborn developers for file upload---------*/


//user
userRouter.post("/register",upload.single("imageFolder"), registerUser)
userRouter.post("/login",userLogin)
userRouter.get("/testing",verifyToken,(req,res)=>{
    res.status(200).send({success:true,message:"sucessfull Testing"})
})
userRouter.post("/updatePassword",verifyToken,updatePassword)
userRouter.post("/forgotPassword",forgotPassword)
userRouter.post("/resetPassword",resetPassword)



module.exports={userRouter}
