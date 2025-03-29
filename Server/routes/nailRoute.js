const express=require("express")
const { getNailProducts } = require("../controllers/nailContriller")

const route=express.Router()


route.get("/Nail",getNailProducts)


module.exports=route