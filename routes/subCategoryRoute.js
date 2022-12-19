const express=require("express")
const { createSubCategory } = require("../controllers/subCategoryController/subCategoryController")
const {verifyToken}=require("../middleware/auth")
 const subcategoryRouter=express.Router()

 //middleware
 subcategoryRouter.use(express.json())
 subcategoryRouter.use(express.urlencoded({extended:false}))

 //routes
 subcategoryRouter.post("/addSubCategory",verifyToken,createSubCategory)

module.exports={subcategoryRouter}
  