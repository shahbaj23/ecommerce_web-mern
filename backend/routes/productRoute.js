import express from "express";
import {
  addProduct,
  getProducts,
  getSingleProduct,
  removeProduct,
} from "../controller/productController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";

const productRouter = express.Router();

productRouter.post(
  "/add-product",
  authAdmin,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }
  ]),
  addProduct
);
productRouter.get("/product-list", getProducts);
productRouter.post("/remove-product", authAdmin, removeProduct);
productRouter.get("/single-product/:id", getSingleProduct);

export default productRouter