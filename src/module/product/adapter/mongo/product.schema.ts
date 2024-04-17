import mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  stock: Number,
  sellerId: String,
});
