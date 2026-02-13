import orderModel from "../Models/orderModel.js";
import User from "../Models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";

// globalvariables
const currency = "inr";
const deliveryCharge = 10;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const onlineStripeOrder = async(req, res)=>{
  try {
    
    const { userId, items, amount, address } = req.body;
    const {origin} = req.headers

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "stripe",
      payment: true,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();

    const line_items = items.map((item)=>({
      price_data: {
        currency: currency,
        product_data: {
          name: item.title
        },
        unit_amount: item.price * 100
      },
      quantity: item.qty
    }))

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: deliveryCharge * 100
      },
      quantity: 1
    })

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`, 
      cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment'
    })

    res.json({ succuss: true, session_url: session.url});

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

const verifyStripe = async (req, res)=>{
  const {orderId, success, userId} = req.body;
  try {
    if(success === "true"){
      await orderModel.findByIdAndUpdate(orderId, {payment: true})
      await User.findByIdAndUpdate(userId, {cartData: {}})
      res.json({success:true})
    } else {
      await orderModel.findByIdAndDelete(orderId)
      res.json({success:false})
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

const userOrders = async (req, res) => {
  try {
    // const {userId} = req.body;
    const userId = req.params.id;
    const orders = await orderModel.find({ userId });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const status = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, {status})
    res.json({success: true, message: "Status Update"})
  } catch (error) {}
};

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({date: -1});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { placeOrderCOD, status, userOrders, allOrders, onlineStripeOrder, verifyStripe };
