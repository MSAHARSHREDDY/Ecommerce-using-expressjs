const mongoose=require("mongoose")
const connectDB=()=>
{
    try
    {
        mongoose.connect(process.env.uri,{
            dbName:process.env.dbName
        })
        console.log("connected successfull")
    }
    catch(err)
    {
        console.log(err)
        resizeBy.send("failed to connect")
    }
}
module.exports={connectDB}