# **🧩 CRUD Operations with Mongoose**

## **🎯 Goal**

A TypeScript rewrite of the previous MongoDB Shell exercise using Mongoose, with basic schemas and type-safe file organization.

### **Why Mongoose?**

MongoDB Shell is useful for quick testing, but lacks structure, validation, and reusability. Mongoose gives us:

- **Schemas** for consistent data shape
- **Type safety** with TypeScript
- **Validation and defaults**
- **Auto timestamps** (`createdAt`, `updatedAt`)
- **Better maintainability** in applications

### **Folder Structure**

```bash
📁 project-root
├── .env
├── package.json
├── tsconfig.json
└── 📁 src
    ├── 📄 db.ts                # MongoDB connection logic
    ├── 📁 models
    │   └── 📄 Products.ts      # Mongoose model definition
		│   └── 📄 index.ts         # Barrel file for clean imports
    ├── 📁 controllers
    │   ├── 📄 create.ts        # Create documents (insertOne, insertMany)
    │   ├── 📄 read.ts          # Read documents (find)
    │   ├── 📄 update.ts        # Update documents (updateOne, updateMany)
    │   └── 📄 delete.ts        # Delete documents (deleteOne, deleteMany)
```

## **Setup**

### **Required NPM Packages**

```bash
npm install mongoose                   # → ✅ required at runtime
npm install -D typescript @types/node  # → 🛠️ used during development
```

### **`.env`**

```bash
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net
```

💡 for full setup instructions, revisit: [Running TypeScript in Node](https://www.notion.so/Running-TS-in-Node-21dae18bcb548013a47ef10717d063d0?pvs=21)

### **`package.json` Scripts**

```json
"scripts": {
  "type-check": "tsc",
  "create": "node --experimental-transform-types --disable-warning=ExperimentalWarning --env-file=.env src/controllers/create.ts",
  "read": "node --experimental-transform-types --disable-warning=ExperimentalWarning --env-file=.env src/controllers/read.ts",
  "update": "node --experimental-transform-types --disable-warning=ExperimentalWarning --env-file=.env src/controllers/update.ts",
  "delete": "node --experimental-transform-types --disable-warning=ExperimentalWarning --env-file=.env src/controllers/delete.ts"
}
```

### **`src/db.ts`**

Establishes a connection to MongoDB using the URI from `.env`. Should be imported first in every controller to ensure DB is connected before queries.

```tsx
import mongoose from 'mongoose';
const MONGO_URI = process.env.MONGO_URI || '';

try {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB');
} catch (err) {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
}
```

### **`src/models/Products.ts`**

Defines a `Product` model using `mongoose.Schema`, with validation rules and timestamps. Only `createdAt` is enabled in this case.

```tsx
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
```

Importing Models from `index.ts`

to simplify and organise imports, we use an **`index.ts` barrel file** inside the models folder:

### **`src/models/index.ts`**

```tsx
export { default as Product } from './Products.ts';
```

This is a **barrel file**, which lets you import models more cleanly:

```tsx
// Instead of:

import Product from '#/models/Products.ts';

// You can simply write:

import { Product } from '#/models';
```

### **`src/controllers/create.ts`**

```tsx
import '#db';
import { Product } from '#models';

await Product.create({
  name: 'T-Shirt',
  price: 19.99,
  stock: 50,
  tags: ['clothing', 'unisex'],
});

await Product.insertMany([
  { name: 'Hoodie', price: 34.99, stock: 30, tags: ['clothing', 'winter'] },
  { name: 'Sneakers', price: 59.99, stock: 20, tags: ['shoes', 'sport'] },
  { name: 'Cap', price: 14.99, stock: 100, tags: ['accessory', 'summer'] },
]);

console.log('✅ added Products into Database');
process.exit();
```

### **`src/controllers/read.ts`**

```tsx
import '#db';
import { Product } from '#models';

console.log('📦 All products:\n', await Product.find());

console.log(
  "🧢 Products with 'clothing' tag:\n",
  await Product.find({ tags: 'clothing' })
);

console.log(
  '📈 In-stock products:\n',
  await Product.find({ stock: { $gt: 0 } })
);

console.log(
  '💰 Within price range $10 - $30:\n',
  await Product.find({ price: { $gte: 10, $lte: 30 } })
);

process.exit();
```

### **`src/controllers/update.ts`**

```tsx
import '#db';
import { Product } from '#models';

await Product.updateOne({ name: 'T-Shirt' }, { $set: { stock: 45 } });
console.log('🔄 T-Shirt stock updated');

await Product.updateMany({ tags: 'clothing' }, { $addToSet: { tags: 'sale' } });
console.log('🏷️  Added "sale" tag to all clothing items');

process.exit();
```

### **`src/controllers/delete.ts`**

```tsx
import '#db';
import { Product } from '#models';

// Delete specific product by name
await Product.deleteOne({ name: 'Cap' });
console.log('🗑️  Deleted product: Cap');

// Delete all out-of-stock products
await Product.deleteMany({ stock: { $lte: 0 } });
console.log('🧹 Deleted all out-of-stock products');

// Optionally, delete all products
// await Product.deleteMany({});
// console.log('🧹 All products deleted');

process.exit();
```

## **Example Usage**

```bash
npm run create     # ➕ Insert sample products into the database
npm run read       # 🔍 Query products (by tag, stock, or price range)
npm run update     # 🔄 Update product stock or tags
npm run delete     # 🗑️ Delete specific or all products
```

## **Outcome**

- Learn how to **migrate MongoDB Shell logic into an actual Node.js project**
  - Understand **schema-based development** using Mongoose
  - Practice CRUD operations
