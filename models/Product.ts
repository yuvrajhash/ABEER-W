import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  type: 'human' | 'veterinary';
  image: string;
  stock: number;
  ingredients?: string[];
  dosage?: string;
  sideEffects?: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    type: { 
      type: String, 
      required: true, 
      enum: ['human', 'veterinary'] 
    },
    image: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    ingredients: { type: [String] },
    dosage: { type: String },
    sideEffects: { type: [String] },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Check if the model is already defined to prevent overwriting during hot reloads
const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;