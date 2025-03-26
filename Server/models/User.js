const mongoose=require("mongoose")
const UserSchema = new mongoose.Schema({
    phone: { type: String, unique: true, required: true },
    verified: { type: Boolean, default: false },
},{timestamps:true})    

const UserModel=mongoose.model('User',UserSchema)
module.exports=UserModel;