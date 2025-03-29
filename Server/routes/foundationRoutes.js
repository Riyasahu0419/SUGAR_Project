const express=require("express")
const { getFoundationProducts } = require("../controllers/foundation")
const route=express.Router()


route.get("/FP",getFoundationProducts)


module.exports=route