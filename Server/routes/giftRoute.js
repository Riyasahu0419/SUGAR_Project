const express=require("express")

const { getGiftProducts } = require("../controllers/giftController")
const route=express.Router()


route.get("/Gift",getGiftProducts)


module.exports=route