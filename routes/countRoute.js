const express=require("express")
const { dataCount } = require("../controllers/countController")
const countRouter=express.Router()
const {verifyToken}=require("../middleware/auth")

//middleware
countRouter.use(express.json())
countRouter.use(express.urlencoded({extended:false}))

countRouter.get("/dataCount",verifyToken,dataCount)

module.exports={countRouter}