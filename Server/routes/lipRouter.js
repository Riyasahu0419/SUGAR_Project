const express=require("express")
const { getLipProducts } = require("../controllers/LipController")
const route=express.Router()


route.get("/Lip",getLipProducts)


module.exports=route