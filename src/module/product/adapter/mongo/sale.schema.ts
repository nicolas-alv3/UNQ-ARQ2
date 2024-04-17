import mongoose from 'mongoose';
import { ProductSchema } from './product.schema';

const ItemSchema = new mongoose.Schema({
  amount: Number,
  product: ProductSchema,
});

export const SaleSchema = new mongoose.Schema({
  date: String,
  items: [ItemSchema],
});
