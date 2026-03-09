import { v2 as cloudinary } from "cloudinary";
import Product from "../Models/productModel.js";
import { cosineSimilarity } from "../utils/cosineSimilarity.js";
import { getEmbedding } from "../utils/getEmbedding.js";

// Add Product
const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      subCategory,
      sizes,
      stock,
      offers,
    } = req.body;

    const image2 = req.files.image2 && req.files.image2[0];
    const image1 = req.files.image1 && req.files.image1[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );

    const imagesUrl = await Promise.all(
      images.map((item) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            },
          );
          stream.end(item.buffer);
        });
      }),
    );

    const embedding = await getEmbedding(`${title} ${description}`);

    const productData = {
      title,
      description,
      price: Number(price),
      category,
      subCategory,
      offers: JSON.parse(offers),
      sizes: JSON.parse(sizes),
      images: imagesUrl,
      stock: Number(stock),
      date: Date.now(),
      embedding,
    };

    const product = new Product(productData);

    await product.save();

    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      price,
      category,
      subCategory,
      sizes,
      stock,
      offers,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const product = await Product.findById(id);

    const newImages = [image1, image2, image3, image4].filter(Boolean);

    let imagesUrl = product.images;

    if (newImages.length > 0) {
      imagesUrl = await Promise.all(
        newImages.map((item) => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "products" },
              (err, result) => {
                if (err) reject(err);
                else resolve(result.secure_url);
              },
            );
            stream.end(item.buffer);
          });
        }),
      );
    }

    product.embedding = await getEmbedding(
      `${title || product.title} ${description || product.description}`,
    );

    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.subCategory = subCategory || product.subCategory;
    product.sizes = sizes || product.sizes;
    product.stock = stock || product.stock;
    product.offers = offers || product.offers;
    product.images = imagesUrl;

    await product.save();

    res.json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// List Product
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ date: -1 });
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

const getSimilarProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const currentProduct = await Product.findById(id);

    if (!currentProduct || !currentProduct.embedding) {
      return res.status(404).json({
        message: "Product not found or no embedding",
      });
    }

    const allProducts = await Product.find({
      _id: { $ne: id },
      category: currentProduct.category,
      subCategory: currentProduct.subCategory,
    });

    const productsWithScore = allProducts.map((p) => ({
      product: p,
      score: cosineSimilarity(currentProduct.embedding, p.embedding),
    }));

    const shuffled = productsWithScore
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
      .sort(() => 0.5 - Math.random());

    const top8 = shuffled.slice(0, 8).map((p) => p.product);

    // const top8 = productsWithScore.slice(0, 8).map((p) => p.product);

    res.status(200).json(top8);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  addProduct,
  updateProducts,
  getProducts,
  removeProduct,
  getSingleProduct,
  getSimilarProducts,
};
