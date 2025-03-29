const express=require("express")
const { getSkinProducts } = require("../controllers/skinController")
const route=express.Router()


route.get("/Skin",getSkinProducts)


module.exports=route