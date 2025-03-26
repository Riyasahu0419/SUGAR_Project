const mongoose=require("mongoose")
const ConnectDB= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("server connected to database")
        
    } catch (error) {
        console.log("something went wrong:",error)
    }
}

module.exports=ConnectDB;