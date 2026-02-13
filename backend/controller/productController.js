import { v2 as cloudinary } from "cloudinary";
import Product from "../Models/productModel.js";

// Add Product
const addProduct = async (req, res) => {
  try {

    const { title, description, price, category, subCategory, sizes, stock } =
      req.body;

    const image2 = req.files.image2 && req.files.image2[0];
    const image1 = req.files.image1 && req.files.image1[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const imagesUrl = await Promise.all(
      images.map((item) => {
        return new Promise((resolve, reject)=>{
          const stream = cloudinary.uploader.upload_stream(
            {folder: 'products'}, (error, result)=>{
              if(error) reject(error);
              else resolve(result.secure_url)
            }
          )
          stream.end(item.buffer)
        })
      })
    );

    const productData = {
      title,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      images: imagesUrl,
      stock: Number(stock),
      date: Date.now(),
    };


    const product = new Product(productData);

    await product.save();

    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// List Product
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//Delete Product
const removeProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Removed product" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Single Product
const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export { addProduct, getProducts, removeProduct, getSingleProduct };
