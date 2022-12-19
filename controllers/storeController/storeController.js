const {storeModel}=require("../../models/storeModel")
const {userModel}=require("../../models/userModel")
const createStore=async(req,res)=>
{
    try
    {
       const userData= await userModel.findOne({_id:req.body.vendor_id })
       if(userData)
       {
            if(!req.body.latitude || !req.body.longitude)
            {
                res.status(400).send("latitude and longitude is not found")
            }
            else
            {
                 const vendorData=await storeModel.findOne({vendor_id:req.body.vendor_id})
                if(vendorData)
                {
                    res.send({"status":"400","message":"This vendor already created a store"})
                }
                else
                {
                    const doc=new storeModel
                    ({
                        vendor_id:req.body.vendor_id,
                        logo:req.file.filename,
                        bussiness_email:req.body.bussiness_email,
                        address:req.body.address,
                        pin:req.body.pin,
                        location:{
                            type:"Point",
                            coordinates:[parseFloat(req.body.longitude),parseFloat(req.body.latitude)]
                        }

                    })
                    const result=await doc.save()
                    res.send({"status":"200","message":"success",data:result})
                }
            }
       }
       else
       {
        res.status(400).send("vendor id doesnot exists")
       }
    }
    catch(err)
    {
        res.status(400).send(err.message)
    }
}

const get_store=async(id)=>{
    try
    {
        return storeModel.findOne({_id:id})
    }
    catch(err)
    {
        res.status(400).send(err.message)
    }
}

//find nearest store
const findNearestStore=async(req,res)=>
{
    try
    {
        const{latitude,longitude}=req.body
        const storeData=await storeModel.aggregate([
            {
                $geoNear:{
                    near:{type:"Point",coordinates:[parseFloat(longitude),parseFloat(latitude)]},
                    key:"location",
                    maxDistance:parseFloat(5000)*1609,
                    distanceField:"dist.calculated",
                    spherical:true
                }
            }
        ])
        res.send({"status":"200","message":"success",data:storeData})
    }
    catch(err)
    {
        res.status(400).send(err.message)
    }
}


module.exports={createStore,get_store,findNearestStore}
  