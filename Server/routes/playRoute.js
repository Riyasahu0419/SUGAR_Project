const express=require("express")
const { getPlayProducts } = require("../controllers/playController")
const route=express.Router()


route.get("/Play",getPlayProducts)


module.exports=route