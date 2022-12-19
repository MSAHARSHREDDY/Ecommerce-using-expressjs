const express=require("express")
const { buyProduct } = require("../controllers/buyProductController/buyProductController")
const buyProductRouter=express.Router()
const {verifyToken}=require("../middleware/auth")

//middleware
buyProductRouter.use(express.json())
buyProductRouter.use(express.urlencoded({extended:false}))

buyProductRouter.post("/buyProduct",verifyToken,buyProduct)

module.exports={buyProductRouter}