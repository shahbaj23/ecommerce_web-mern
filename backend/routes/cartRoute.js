import express from "express"
import { authUser } from "../middleware/auth.js"
import { addtoCart, getUserCart, removeCartItem, updateCart } from "../controller/cartController.js"


const cartRouter = express.Router()

cartRouter.post("/add-cart", authUser, addtoCart)
cartRouter.post("/update-cart", authUser, updateCart)
cartRouter.delete("/delete", authUser, removeCartItem)
cartRouter.get("/get-cart", authUser, getUserCart)

export default cartRouter