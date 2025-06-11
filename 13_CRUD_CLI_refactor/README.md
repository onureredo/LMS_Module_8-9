# **🧩 CRUD CLI with Mongoose**

## 🎯 Goal

Rebuild the previous CLI application using **Mongoose** instead of the native MongoDB driver. This allows us to define schemas and models, adding structure and validation to our data. The project is still built in **TypeScript**, and supports full CRUD operations for a product inventory system.

## **📦 Setup**

```bash
npm init -y
npm install tsx typescript @types/node mongodb commander
```

## **🗂️ Create a `.env` File**

In the root of your project, create a `.env` file:

```markdown
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_db
```

> ❗️ Do not commit .env to your repository. Add it to .gitignore.

## **📄 scripts in `package.json`**

```json
"scripts": {
  "type-check": "tsc",
   "start": "tsx --env-file=.env src/app.ts"
}
```

### 💡for setup instructions, revisit: [Running TypeScript in Node](https://www.notion.so/Running-TS-in-Node-1faae18bcb5480ad89d8fc54b1a84f85?pvs=21)

## **📁 Folder Structure**

```bash
📁 project-root
├── .env
├── package.json
├── tsconfig.json
└── 📁 src
    ├── 📄 app.ts          # Main logic
    ├── 📄 db.ts           # Mongoose connection setup
    ├── 📁 models          # Mongoose schemas/models
    │   └── product.model.ts
    └── 📁 controllers     # CRUD logic
        └── product.controller.ts
```

## Database Connection via Mongoose

Before we dive into the modeling part, we need to establish a connection with our MongoDB database. This is the same as in our previous CLI exercise, but now we’re using Mongoose instead of the native MongoDB driver. Mongoose will manage the connection under the hood, and provide us with powerful features like schemas, models, and validation.

## **src/db.ts**

```tsx
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || '';

export const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ Connection error:', err);
    process.exit(1);
  }
};
```

## Creating Product Schema

In our previous CLI version, we directly inserted objects into the database without defining their structure. This time, we’re doing it properly by **defining a schema** — a blueprint that describes what a `Product` should look like in the database. Let’s create a `productSchema` using Mongoose, and then generate a **model** from it. This model will allow us to interact with the `products` collection in a type-safe and structured way.

### **src/models/productSchema.ts**

```tsx
import { Schema, model, Document } from 'mongoose';

// Define TypeScript interface for strong typing
export interface ProductDocument extends Document {
  name: string;
  stock: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

// Create Mongoose schema with validation rules
const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt
);

// Export the model to use in controllers
export const Product = model<ProductDocument>('Product', productSchema);
```

## Controllers

Once we have our model, we can create a separate file to hold the actual logic for our CRUD operations. This is our **controller layer**, which keeps the application modular. Each function here will use the Mongoose model to interact with the database: adding, listing, updating, and deleting products.

### **src/controllers/product.controller.ts**

```tsx
import { Product } from '@/models/product.model';

// CREATE
export const addProduct = async (
  name: string,
  stock: number,
  price: number
) => {
  await Product.create({ name, stock, price });
  console.log(`✅ Added: ${name} (${stock} pcs at $${price})`);
};

// READ
export const listProducts = async () => {
  const products = await Product.find();
  console.log('📦 Products:');
  products.forEach((p, i) =>
    console.log(`${i + 1}. ${p.name} — ${p.stock} pcs — $${p.price}`)
  );
};

// UPDATE
export const updateProduct = async (
  name: string,
  stock: number,
  price: number
) => {
  const result = await Product.findOneAndUpdate(
    { name },
    { stock, price, updatedAt: new Date() },
    { new: true }
  );
  if (result) {
    console.log(`🔁 Updated: ${name} to ${stock} pcs at $${price}`);
  } else {
    console.log('⚠️ Product not found.');
  }
};

// DELETE
export const deleteProduct = async (name: string) => {
  const result = await Product.findOneAndDelete({ name });
  if (result) {
    console.log(`🗑️ Deleted: ${name}`);
  } else {
    console.log('⚠️ Product not found.');
  }
};
```

## 🧠 Main Logic

Now it’s time to tie everything together. Just like in our previous CLI app, we’ll use the `commander` package to define commands and parse CLI input. This time, each command will trigger a function in our controller, which will in turn use the Mongoose model to work with the database.

## src/app.ts

```tsx
import { Command } from 'commander';
import { connectToDB } from './db';
import {
  addProduct,
  listProducts,
  updateProduct,
  deleteProduct,
} from '@/controllers/product.controller';

// Connect to the database before anything else
await connectToDB();

// Initialize commander CLI program
const program = new Command();
program
  .name('mongoose-crud-cli')
  .version('1.0.0')
  .description('Product management CLI');

// Define each CLI command and its arguments
program
  .command('add')
  .argument('<name>', 'Product name')
  .argument('<stock>', 'Stock quantity')
  .argument('<price>', 'Price')
  .action((name, stockStr, priceStr) => {
    addProduct(name, parseInt(stockStr), parseFloat(priceStr));
  });

program.command('list').action(() => listProducts());

program
  .command('update')
  .argument('<name>', 'Product name')
  .argument('<stock>', 'New stock')
  .argument('<price>', 'New price')
  .action((name, stockStr, priceStr) => {
    updateProduct(name, parseInt(stockStr), parseFloat(priceStr));
  });

program
  .command('delete')
  .argument('<name>', 'Product name')
  .action((name) => deleteProduct(name));

// Start parsing CLI input
program.parse();
```

## **Example Usage**

```bash
npm run start add "T-Shirt" 50 19.99
npm run start list
npm run start update "T-Shirt" 25 14.99
npm run start delete "T-Shirt"
```

Now we have a full-featured CLI app using Commander, Mongoose, and TypeScript with clean modular structure and schema validation.
