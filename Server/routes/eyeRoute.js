const express=require("express")
const { getEyeProducts } = require("../controllers/eyeController")
const route=express.Router()


route.get("/Eye",getEyeProducts)


module.exports=route