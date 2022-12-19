const dotenv=require("dotenv")
dotenv.config()
const express=require("express")
const {userRouter}=require("./routes/userRoute")
const {connectDB}=require("./db/connectDB")
const { storeRouter } = require("./routes/storeRoute")
const { categoryRouter } = require("./routes/categoryRoute")
const { subcategoryRouter } = require("./routes/subCategoryRoute")
const { productRouter } = require("./routes/productRoute")
const { countRouter } = require("./routes/countRoute")
const { cartRouter } = require("./routes/cartRoute")
const { buyProductRouter } = require("./routes/buyProductRoute")
const app=express()

connectDB()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//static
app.use(express.static("public"))

const port=process.env.port||5000

//user routes
app.use("/api",userRouter)

//store routes
app.use("/api",storeRouter)

//category routes
app.use("/api",categoryRouter)

//subCategory routes
app.use("/api",subcategoryRouter)

//product routes
app.use("/api",productRouter)

//common router
app.use("/api",countRouter)

//addToCart
app.use("/api",cartRouter)

//buyProduct
app.use("/api",buyProductRouter)

app.listen(port,()=>{
    console.log("listening on port "+port)
})
