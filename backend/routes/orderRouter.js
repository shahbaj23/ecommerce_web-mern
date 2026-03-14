import express from 'express'
import { authUser } from '../middleware/auth.js'
import { allOrders, onlineStripeOrder, orderNotification, placeOrderCOD, status, totalOrder, totalRevenue, userOrders, verifyStripe } from '../controller/orderController.js'
import authAdmin from '../middleware/authAdmin.js'

const orderRouter = express.Router()

//admin
orderRouter.post("/all-orders", authAdmin, allOrders)
orderRouter.put("/status", authAdmin, status)

//payment features
orderRouter.post("/place",authUser, placeOrderCOD)
orderRouter.post("/stripe", authUser, onlineStripeOrder)
// orderRouter.post("/razorpay",authUser, placeorderrazorpay)

//User Feature
orderRouter.get("/userorders/:id", authUser, userOrders)

orderRouter.post("/verifyStripe", authUser, verifyStripe)
orderRouter.get("/notification", authAdmin, orderNotification)

orderRouter.get("/get-all-orders", authUser, totalOrder)
orderRouter.get("/total-price", authUser, totalRevenue)

export default orderRouter