import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import { getProducts, createProduct, updateProducts, deleteProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.get("/", getProducts);
  
  router.post("/", createProduct);
  
  router.put("/:id", updateProducts);
  
  router.delete("/:id", deleteProduct);

  
export default router;