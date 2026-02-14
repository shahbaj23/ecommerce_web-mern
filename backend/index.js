import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
const app = express();
import mongoConnectDb from './db.js'
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoute.js';
import connectCloudinary from './config/cloudinary.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRouter.js';

dotenv.config(); 

const port = process.env.PORT || 3000;

mongoConnectDb();
connectCloudinary()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(cors({
  origin: [
    "http://localhost:5173", // local frontend
    "https://stylenest-front-end.vercel.app" // deployed frontend
  ],
  credentials: true
}));


app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})