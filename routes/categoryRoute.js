const express=require("express")
const { addCategory } = require("../controllers/categoryController/categoryController")
const {verifyToken}=require("../middleware/auth")
 const categoryRouter=express.Router()

 //middleware
 categoryRouter.use(express.json())
 categoryRouter.use(express.urlencoded({extended:false}))

 //routes
categoryRouter.post("/addCategory",verifyToken,addCategory)

module.exports={categoryRouter}
  