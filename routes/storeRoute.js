const express=require("express")
const {verifyToken}=require("../middleware/auth")
const multer=require("multer")
const path=require("path")
const { createStore, findNearestStore } = require("../controllers/storeController/storeController")
const storeRouter=express.Router()

//middleware
storeRouter.use(express.json())
storeRouter.use(express.urlencoded({extended:false}))


/*-----------------refer to stubborn developers for file upload---------*/
const storage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,"./public/storeImages")
    },
    filename:function(req,file,callback)
    {
        console.log(file)
        callback(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})
const upload=multer({storage:storage})
/*-----------------refer to stubborn developers for file upload---------*/


storeRouter.post("/createStore",verifyToken,upload.single("logoFolder"),createStore)

storeRouter.post("/findNearestStore",verifyToken,findNearestStore)

module.exports={storeRouter}