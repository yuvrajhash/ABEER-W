import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: 'user' | 'admin';
  addresses?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  }[];
  orders?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    role: { 
      type: String, 
      enum: ['user', 'admin'], 
      default: 'user' 
    },
    addresses: [{
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      isDefault: { type: Boolean, default: false }
    }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
  },
  { timestamps: true }
);

// Check if the model is already defined to prevent overwriting during hot reloads
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;