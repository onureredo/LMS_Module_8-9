# **🧩 CRUD CLI with TypeScript + MongoDB**

## 🎯 Goal

Build a complete CLI tool using **TypeScript** and **MongoDB** to perform full CRUD operations like Create, Read, Update, and Delete on an eCommerce-style product list.

This project teaches you how to:

- Run TypeScript files in Node.js
- Connect to a MongoDB database
- Perform database operations from the terminal
- Handle command-line arguments using `commander`

## 💡 What is Commander?

[`commander`](https://www.npmjs.com/package/commander) is a popular and lightweight Node.js library used for building command-line interfaces. It helps you:

- Parse and validate CLI arguments easily
- Structure commands and subcommands clearly
- Add descriptions, help text, and default values for a better CLI experience

It’s perfect for projects where you want a user-friendly and scalable terminal tool.

> 💡 For full setup instructions, revisit: [Running TypeScript in Node](https://www.notion.so/Running-TS-in-Node-1faae18bcb5480ad89d8fc54b1a84f85?pvs=21)

---

## **📦 Setup**

```bash
npm init -y
npm install tsx typescript @types/node mongodb commander
```

## **🗂️ Create a `.env` File**

In the root of your project, create a `.env` file:

```env
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_db
```

> 🛑 Do not commit `.env` to your repository. Add it to `.gitignore`.

---

## **📄 Scripts in `package.json`**

```json
"scripts": {
  "type-check": "tsc",
  "dev": "tsx watch --env-file=.env src/app.ts",
  "start": "tsx src/app.ts"
}
```

---

## **📁 Project Structure**

```bash
📁 project-root/
├── 📁 node_modules/     # Installed dependencies (ignored by Git)
├── 📄 .env              # Environment variables (e.g. MongoDB URI)
├── 📄 .gitignore        # Files/folders to exclude from Git
├── 📄 package.json      # Project metadata and scripts
├── 📄 tsconfig.json     # TypeScript configuration
└── 📁 src/
    ├── 📄 db.ts         # MongoDB connection logic
    └── 📄 app.ts        # CLI logic using commander
```

---

## **📄 src/db.ts**

```ts
import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI || '';
const client = new MongoClient(MONGO_URI);

(async () => {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
})();

export const db = client.db('ecommerce');
```

---

## **📄 src/app.ts (using Commander)**

```ts
import { Command } from 'commander';
import { db } from './db';

// Initialize the CLI program
const program = new Command();
program
  .name('ecommerce-cli')
  .description('Simple product CRUD CLI')
  .version('1.0.0');

// CREATE — Add a new product
program
  .command('add')
  .description('Add a new product')
  .argument('<name>', 'Product name')
  .argument('<stock>', 'Stock quantity')
  .argument('<price>', 'Product price')
  .action(async (name, stockStr, priceStr) => {
    const stock = parseInt(stockStr);
    const price = parseFloat(priceStr);

    // Insert the new product into the database
    await db.collection('products').insertOne({
      name,
      stock,
      price,
      created_at: new Date(),
    });

    console.log(`✅ Added: ${name} (${stock} pcs at $${price})`);
  });

// READ — List all products
program
  .command('list')
  .description('List all products')
  .action(async () => {
    const products = await db.collection('products').find().toArray();

    console.log('📦 Products:');
    products.forEach((p, i) =>
      console.log(`${i + 1}. ${p.name} — ${p.stock} pcs — $${p.price}`)
    );
  });

// UPDATE — Update an existing product
program
  .command('update')
  .description('Update product by name')
  .argument('<name>', 'Product name')
  .argument('<stock>', 'New stock quantity')
  .argument('<price>', 'New product price')
  .action(async (name, stockStr, priceStr) => {
    const stock = parseInt(stockStr);
    const price = parseFloat(priceStr);

    const result = await db.collection('products').updateOne(
      { name }, // Match by product name
      {
        $set: {
          stock,
          price,
          updated_at: new Date(),
        },
      }
    );

    if (result.matchedCount) {
      console.log(`🔁 Updated: ${name} to ${stock} pcs at $${price}`);
    } else {
      console.log('⚠️ Product not found.');
    }
  });

// DELETE — Remove a product
program
  .command('delete')
  .description('Delete product by name')
  .argument('<name>', 'Product name')
  .action(async (name) => {
    const result = await db.collection('products').deleteOne({ name });

    if (result.deletedCount) {
      console.log(`🗑️ Deleted: ${name}`);
    } else {
      console.log('⚠️ Product not found.');
    }
  });

// Parse CLI arguments
program.parse();
```

---

## **🧪 Example Command Structure**

```bash
npm run start <operation> <product name> <stock> <price>
```

## ✅ Summary

With this CLI tool, you can:

- Add new products: `npm run start add "T-Shirt" 50 19.99`
- List all products: `npm run start list`
- Update a product: `npm run start update "T-Shirt" 25 14.99`
- Delete a product: `npm run start delete "T-Shirt"`

🧠 You now have a fully functional CLI tool with `commander` and MongoDB.
