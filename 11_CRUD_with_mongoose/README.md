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

### ⚙️ Update `dev` Script for .env Support

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

# 📚 Step 2: Define the `Book` Model with Mongoose

Now that we have our MongoDB connection set up, it's time to define a simple data model. For this example, we will use a `Book` model.

## 📙 Defining a Mongoose Book Model

Let's define a simple `Book` model using Mongoose.

### 📄 `src/models/Book.ts`

```ts
import { Schema, model } from 'mongoose';

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number },
  coverImage: { type: String }, //  URL of the book cover image
});

export const Book = model('Book', BookSchema);
```

### 💡 Why These Fields?

| Field           | Type     | Required | Purpose                         |
| --------------- | -------- | -------- | ------------------------------- |
| `title`         | `String` | ✅       | Name of the book                |
| `author`        | `String` | ✅       | Author's name                   |
| `publishedYear` | `Number` | ❌       | The year the book was published |
| `coverImage`    | `String` | ❌       | URL of the book's cover image   |

## 📘 Book Controller

Now we will define basic controller logic to handle **CRUD operations** on our `Book`.

### 📄 `src/controllers/bookController.ts`

```ts
import Book from '../models/bookSchema';

export async function getAllBooks() {
  const books = await Book.find();
  if (!books.length) {
    throw new Error('No books found');
  }
  return books;
}

export async function getBookById(id: string) {
  const book = await Book.findById(id);
  if (!book) {
    throw new Error('Book not found');
  }
  return book;
}

export async function addNewBook(bookData: {
  title: string;
  author: string;
  publishedYear: number;
  coverImage: string;
}) {
  const newBook = await Book.create(bookData);
  return newBook;
}

export async function updateBook(
  id: string,
  updatedData: {
    title?: string;
    author?: string;
    publishedYear?: number;
    coverImage?: string;
  }
) {
  const updatedBook = await Book.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  if (!updatedBook) {
    throw new Error('Book not found');
  }
  return updatedBook;
}

export async function deleteBook(id: string) {
  const deletedBook = await Book.findByIdAndDelete(id);
  if (!deletedBook) {
    throw new Error('Book not found');
  }
  return { message: 'Book deleted successfully' };
}
```

---

## 🧠 Why No `req`, `res`, `next`?

We're **not using Express or any HTTP framework yet**.

- `req`, `res`, `next` are part of Express — used inside route handlers.
- Here, we're building logic with plain functions.
- This allows testing logic independently without a server.

### 🧪 Example usage (in `index.ts` or test file):

```ts
import { getAllBooks } from './controllers/bookController';

(async () => {
  try {
    const books = await getAllBooks();
    console.log(books);
  } catch (error) {
    console.error(error);
  }
})();
```

---

✅ Later, when we add Express, these functions can be directly used inside route handlers with `req`, `res`, and `next`.

Until then, they serve as the "business logic" layer of our app.
