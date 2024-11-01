import mongoose from "mongoose";
import Product from "../models/product.model.js";
import redis from "redis";
import responseTime from "response-time";
import { promisify } from "util";
import { GET_ASYNC, SET_ASYNC } from "../server.js";


export const getProducts = async (req, res) => {
  try {
    const isProductInCache = await GET_ASYNC("/api/products");
    if (isProductInCache) {
      res.send(JSON.parse(isProductInCache));
      res.status(200).json({ success: true, data: products });
    }
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
    await SET_ASYNC("/api/products", JSON.stringify(products), 5);
  } catch (error) {
    console.error("product not found: ", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; // user will send this data
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    // await SET_ASYNC("/api/products", JSON.stringify(newProduct), 5);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create product: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProducts = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    // await SET_ASYNC("/api/products", JSON.stringify(updatedProduct), 5);
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  //here colon id means it will be dynamic, any value we can pass
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }

  console.log("id : ", id);
};
