import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: String,
});
