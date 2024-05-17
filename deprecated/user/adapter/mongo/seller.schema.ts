import mongoose from 'mongoose';

export const SellerSchema = new mongoose.Schema({
  name: String,
  email: String,
});
