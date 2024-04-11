import mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  sku: String,
  sellerId: String,
});
