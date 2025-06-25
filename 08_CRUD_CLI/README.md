# **🧩 CRUD CLI with TypeScript + MongoDB**

## 🎯 Goal

Build a complete CLI tool using **TypeScript** and **MongoDB** to perform full CRUD operations like Create, Read, Update, and Delete on an eCommerce-style product list.

This exercise covers how to:

- Run TypeScript files in Node.js
- Connect to a MongoDB database
- Perform database operations from the terminal
- Handle command-line arguments using `commander`

### What is Commander?

`commander` is built on top of Node.js’s native `process.argv` array — which holds all the arguments passed to your CLI script.

It makes it easier to:

- Parse and validate CLI arguments
- Structure commands and subcommands clearly
- Add descriptions, help text, and default values for a better CLI experience

It’s perfect for projects where you want a user-friendly and scalable terminal tool.

## **Setup**

```bash
npm init -y
 # → initialize project

npm install -D typescript @types/node
# → 🛠️ dev-only: TypeScript, Node.js types

npm install mongodb commander
# → ✅ runtime: MongoDB driver & CLI interface helper

```

### **Create a `.env` File**

In the root of your project, create a `.env` file:

```markdown
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_db
```

> 🛑 Do not commit .env to your repository. Add it to .gitignore.

### **scripts in `package.json`**

This project is a **pure CLI tool** — no server, no build step needed.

That’s why we **only use a single `start` script**:

```json
 "scripts": {
    "start": "node --experimental-transform-types --disable-warning=ExperimentalWarning --env-file=.env src/app.ts"
  },
```

Notes:

- We load environment variables using `--env-file=.env`
- No `--watch` flag since we are not auto-reloading during development.
- No `build`, `prestart`, or `dist` output — this CLI runs directly with TypeScript via `node`.

Just run your CLI commands directly with npm start and pass your arguments.

### Import Paths and Aliases

```tsx
import { db } from '#db';
```

This alias is configured in both:

`tsconfig.json` via the `paths` option
`package.json` via the `imports` field (Node ESM support)

### Why `#` instead of `@`?

`@` is reserved for scoped packages in Node.js (like `@types/...`), so using `#` avoids conflicts and is safe for internal paths.

💡 for full setup instructions, revisit: [Running TypeScript in Node](https://www.notion.so/Running-TS-in-Node-21dae18bcb548013a47ef10717d063d0?pvs=21)

### **Example `package.json`**

```json
{
  "name": "my_crud_cli_app",
  "version": "1.0.0",
  "description": "",
  "main": "app.ts",
  "type": "module",
  "imports": {
    "#db": "./src/db.ts"
  },
  "scripts": {
    "start": "node --experimental-transform-types --disable-warning=ExperimentalWarning --env-file=.env src/app.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  },
  "dependencies": {
    "commander": "^14.0.0",
    "mongodb": "^6.17.0"
  }
}
```

### **Folder Structure**

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

### **src/db.ts**

```tsx
import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI || '';
const client = new MongoClient(MONGO_URI);

try {
  await client.connect();
  console.log('✅ Connected to MongoDB');
} catch (err) {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
}

export const db = client.db();
```

### **src/app.ts**

```tsx
import { Command } from 'commander';
import { db } from '#db';

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
  .argument('<oldName>', 'Current product name')
  .argument('<newName>', 'New product name')
  .argument('<stock>', 'New stock quantity')
  .argument('<price>', 'New product price')
  .action(async (oldName, newName, stockStr, priceStr) => {
    const stock = parseInt(stockStr);
    const price = parseFloat(priceStr);

    const result = await db.collection('products').updateOne(
      { name: oldName },
      {
        $set: {
          name: newName,
          stock,
          price,
          updated_at: new Date(),
        },
      }
    );

    if (result.matchedCount) {
      console.log(
        `🔁 Updated: ${oldName} => ${newName} (${stock} pcs at $${price})`
      );
    } else {
      console.log('⚠️  Product not found.');
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
      console.log(`🗑️  Deleted: ${name}`);
    } else {
      console.log('⚠️  Product not found.');
    }
  });

// Parse CLI arguments
program.parse();
```

### **Example Command Structure**

```bash
npm start <operation> <product name> <stock> <price>

# Add a new product
npm start add "Shoes" 20 59.99

# List all products
npm start list

# Update a product → **oldName, newName, stock, price**
npm start update "Shoes" "Boots" 15 79.99

# Delete a product
npm start delete "Boots"
```

## Summary

- Use `process.argv` via Commander to build CLI commands.
- Load environment variables via `--env-file=.env` in the start script.
- Connect to MongoDB and perform basic CRUD operations.
- Organise logic into `src/db.ts` and `src/app.ts` for clarity and separation of concerns.
