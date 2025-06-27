import { Schema, model, Document } from 'mongoose';

// Define TypeScript interface for strong typing
export interface ProductDocument extends Document {
  name: string;
  stock: number;
  price: number;
  tags?: string[]; // (Optional)
  createdAt: Date;
  updatedAt: Date;
}

// Create Mongoose schema with validation rules
const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    tags: [{ type: String }],
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt
);

// Export the model to use in controllers or elsewhere
export const Product = model<ProductDocument>('Product', productSchema);
