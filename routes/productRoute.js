const express=require("express")
const {verifyToken}=require("../middleware/auth")
const multer=require("multer")
const path=require("path")
const { addProduct, getProducts, searchProduct, paginate } = require("../controllers/productController/productController")
const productRouter=express.Router()

//middleware
productRouter.use(express.json())
productRouter.use(express.urlencoded({extended:false}))


/*-----------------refer to stubborn developers for file upload---------*/
const storage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,"./public/productImages")
    },
    filename:function(req,file,callback)
    {
        console.log(file)
        callback(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})
const upload=multer({storage:storage})
/*-----------------refer to stubborn developers for file upload---------*/


productRouter.post("/addProduct",verifyToken,upload.array("productImage"),addProduct)

productRouter.get("/getProducts",verifyToken,getProducts)

productRouter.get("/searchProduct",verifyToken,searchProduct)

productRouter.post("/paginate",verifyToken,paginate)

module.exports={productRouter}