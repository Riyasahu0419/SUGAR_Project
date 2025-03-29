const express=require("express")
const { getNewProducts } = require("../controllers/newController")
const route=express.Router()


route.get("/newproduct",getNewProducts)


module.exports=route