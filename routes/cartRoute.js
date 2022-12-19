const express=require("express")
const { addToCart } = require("../controllers/cartController.js/cartController")
const cartRouter=express.Router()
const {verifyToken}=require("../middleware/auth")

//middleware
cartRouter.use(express.json())
cartRouter.use(express.urlencoded({extended:false}))

cartRouter.post("/addToCart",verifyToken,addToCart)

module.exports={cartRouter}