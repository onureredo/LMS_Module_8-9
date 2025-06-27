import { Schema, model, Document } from 'mongoose';

// Define TypeScript interface for strong typing
export interface ProductDocument extends Document {
  name: string;
  stock: number;
  price: number;
  createdAt: Date;
}

// Create Mongoose schema with validation rules
const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Export the model to use in controllers
export const Product = model<ProductDocument>('Product', productSchema);
export default Product;
