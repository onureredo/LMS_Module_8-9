import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    tags: [{ type: String }],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Product = model('Product', productSchema);
export default Product;
