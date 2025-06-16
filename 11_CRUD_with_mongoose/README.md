# 🧩 CRUD Operations with Mongoose

## 🎯 Goal

A TypeScript rewrite of the previous MongoDB Shell exercise using Mongoose, with basic schemas and type-safe file organization.

## 🧠 Why Mongoose?

MongoDB Shell is useful for quick testing, but lacks structure, validation, and reusability. Mongoose gives us:

- **Schemas** for consistent data shape
- **Type safety** with TypeScript
- **Validation and defaults**
- **Auto timestamps** (`createdAt`, `updatedAt`)
- **Better maintainability** in applications

## 📁 Folder Structure

```bash
📁 project-root
├── .env
├── package.json
├── tsconfig.json
└── 📁 src
    ├── 📄 app.ts               # Entry point
    ├── 📄 db.ts                # MongoDB connection logic
    ├── 📁 models
    │   └── 📄 product.model.ts # Mongoose model definition
    ├── 📁 controllers
    │   ├── 📄 create.ts        # Create documents (insertOne, insertMany)
    │   ├── 📄 read.ts          # Read documents (find)
    │   ├── 📄 update.ts        # Update documents (updateOne, updateMany)
    │   └── 📄 delete.ts        # Delete documents (deleteOne, deleteMany)
```

## ⚙️ Setup

### 📦 Required NPM Packages

To set up the project environment, install the following dependencies:

```bash
npm install mongoose               # → ✅ required at runtime
npm install -D tsx @types/node     # → 🛠️ used only during development
```

### `.env`

```
MONGO_URI=mongodb+srv://<your_user>:<your_pass>@cluster.mongodb.net/test
```

> Note: No need to install `dotenv`, `tsx` loads `.env` automatically.

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "target": "ESNext",
    "moduleDetection": "force",
    "module": "Preserve",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"]
    }
  },
  "include": ["src"]
}
```

### `package.json` Scripts

```json
"scripts": {
 "type-check": "tsc",
  "create": "tsx --env-file=.env src/controllers/create.ts",
  "read": "tsx --env-file=.env src/controllers/read.ts",
  "update": "tsx --env-file=.env src/controllers/update.ts",
  "delete": "tsx --env-file=.env src/controllers/delete.ts"
}
```

## `src/db.ts`

```ts
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || '';

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
})();
```

## `src/models/product.model.ts`

### Define a TypeScript Interface

```ts
import { Document } from 'mongoose';

export interface ProductDocument extends Document {
  name: string;
  stock: number;
  price: number;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Create the Mongoose Schema

```ts
import { Schema } from 'mongoose';

const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    tags: [{ type: String }],
  },
  { timestamps: true }
);
```

### Final Version:

```ts
import { Schema, model, Document } from 'mongoose';

export interface ProductDocument extends Document {
  name: string;
  stock: number;
  price: number;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export const Product = model<ProductDocument>('Product', productSchema);
```

## `src/controllers/create.ts`

```ts
import '@/db';
import { Product } from '@/product.model';

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

console.log('✅ Seeding complete');
process.exit();
```

## `src/controllers/read.ts`

```ts
import '@/db';
import { Product } from '@/product.model';

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

## 🔄 `src/controllers/update.ts`

```ts
import '@/db';
import { Product } from '@/product.model';

await Product.updateOne({ name: 'T-Shirt' }, { $set: { stock: 45 } });
console.log('🔄 T-Shirt stock updated');

await Product.updateMany({ tags: 'clothing' }, { $addToSet: { tags: 'sale' } });
console.log('🏷️ Added "sale" tag to all clothing items');

process.exit();
```

## 🗑️ `src/controllers/delete.ts`

```ts
import '@/db';
import { Product } from '@/product.model';

await Product.deleteOne({ name: 'Cap' });
console.log('🗑️ Deleted product: Cap');

await Product.deleteMany({ stock: { $lte: 0 } });
console.log('🧹 Deleted all out-of-stock products');

process.exit();
```

## **Example Usage**

```bash
npm run create     # ➕ Insert sample products into the database
npm run read       # 🔍 Query products (by tag, stock, or price range)
npm run update     # 🔄 Update product stock or tags
npm run delete     # 🗑️ Delete specific or all products
```

## 🏁 Outcome

By completing this exercise, you will:

- Learn how to **migrate MongoDB Shell logic into an actual Node.js project**
- Understand **schema-based development** using Mongoose
- Practice CRUD operations
