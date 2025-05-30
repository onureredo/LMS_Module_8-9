# TypeScript + Node.JS Setup

Before diving into database operations, let's start with a basic TypeScript + Node.JS setup to create a clean environment for our future MongoDB CRUD logic.

## ⚙️ Step 1: Initialize the Project

```bash
npm init -y
```

### 📦 Install Required Packages

```bash
npm install -D typescript tsx @types/node
```

- `typescript`: The TypeScript compiler.
- `@types/node`: Provides type definitions for Node.js modules like `fs`, `path`, etc.
- `tsx`: Allows running `.ts` files directly without pre-compiling.

### 📁 Create the Project Structure

```bash
mkdir src
cd src
touch index.ts
```

Write something basic in `src/index.ts`:

```ts
const message: string = 'Hello, TypeScript + Node.js';
console.log(message);
```

### 🔧 Add a TypeScript Config File

Create a `tsconfig.json` in your root directory:

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

### 🚀 Run the App with `npm script`

Edit your `package.json`:

```json
  "scripts": {
    "type-check": "tsc",
    "dev": "tsx watch src/index.ts"
  },
```

Then run:

```bash
npm run dev
```

---

## 🧩 Step 2: Connect to MongoDB

Now that our TypeScript + Node.js setup is complete, let's connect to MongoDB using the `mongoose` library.

### 📦 Install Mongoose

```bash
npm install mongoose
```

## ⚙️ Update `dev` Script for .env Support

To use environment variables from a `.env` file, modify your `package.json` like this:

```json
"scripts": {
  "type-check": "tsc",
  "dev": "tsx watch --env-file=.env src/index.ts"
}
```

> ✅ The `--env-file=.env` flag ensures that your environment variables are loaded during development.

### 🗂️ Create a `.env` File

In the root of your project, create a `.env` file:

```
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_db
```

> 🛑 Do **not** commit `.env` to your repository. Add it to `.gitignore`.

### 📁 Create the Database Connection File

In `src/db.ts`, add the following code:

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

> 💡 This script ensures your app exits if the connection fails, helping you catch issues early.

Ready? Next, we’ll create our first schema and do some CRUD operations! ✅
