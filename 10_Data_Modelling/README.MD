# 📚 Data Modelling

Mongoose makes it easier to model and structure your data when working with MongoDB. In this guide, we explore how to design schemas, model relationships, and apply best practices for real-world applications with full TypeScript support.

## 🧠 What is Data Modelling?

**Data modelling** is the process of defining the structure of data stored in a database.

In MongoDB (a NoSQL database), data can be stored without strict structure, but Mongoose introduces schemas to bring order, consistency, and validation to your documents.

## Designing Schemas with Mongoose

Each schema defines the shape of a document in a MongoDB collection.

### Field Types

```js
const userSchema = new Schema({
  name: String,
  age: Number,
  isActive: Boolean,
  createdAt: Date,
  tags: [String],
});
```

### ✅ Validation & Default Values

```js
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: 'user',
  },
});
```

---

## 🔗 Relationships in MongoDB

In MongoDB, we can model relationships in two main ways:

### Embedded Documents

```js
const orderSchema = new Schema({
  customerName: String,
  items: [
    {
      productName: String,
      quantity: Number,
    },
  ],
});
```

### 🔹 Referenced Documents

```js
const orderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});
```

**When to use what?**

| Embedded                           | Referenced                           |
| ---------------------------------- | ------------------------------------ |
| Data is small & unlikely to change | Data is reused across many documents |
| Fast read access is needed         | Separation of concerns               |
| All data always fetched together   | Different fetch scenarios            |

## 🧩 Referencing & Population

Mongoose supports auto-joining references using `.populate()`.

```js
const postSchema = new Schema({
  title: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const post = await Post.findById(id).populate('author', 'name email');
```

## 🧪 Nested Objects & Subdocuments

You can define schemas inside other schemas:

```ts
const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
    },
  ],
});
```

## ⚙️ Schema Options & Plugins (TypeScript)

Schema options in Mongoose allow you to configure how documents behave.

### ⏰ Timestamps

Automatically adds `createdAt` and `updatedAt` fields.
You can also customize which timestamp fields to use:

```ts
import mongoose, { Schema, Document } from 'mongoose';

export interface BlogPostDocument extends Document {
  title: string;
  content: string;
  createdAt: Date;
}

const blogPostSchema = new Schema<BlogPostDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

export const BlogPostModel = mongoose.model<BlogPostDocument>(
  'BlogPost',
  blogPostSchema
);
```

### 🧠 Using Generics and Interfaces

To define a clear structure and ensure type-safety:

```ts
import { Schema, model, connect, Types, HydratedDocument } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  avatar?: string;
  organization: Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
  organization: { type: Schema.Types.ObjectId, ref: 'Organization' },
});

const UserModel = model<IUser>('User', userSchema);

const user: HydratedDocument<IUser> = new UserModel({
  name: 'Bill',
  email: 'bill@initech.com',
  organization: new Types.ObjectId(),
});
```

## 🗂️ Realistic Modelling Example

```ts
// User
const userSchema = new Schema({
  name: String,
  email: String,
});

// Product
const productSchema = new Schema({
  name: String,
  price: Number,
});

// Order
const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
```

---

## 📖 Additional Resources

- [Mongoose Docs – Schema](https://mongoosejs.com/docs/guide.html)
- [MongoDB Docs – Data Modeling](https://www.mongodb.com/docs/manual/core/data-modeling-introduction/)
- [Mongoose TypeScript Guide](https://mongoosejs.com/docs/typescript.html)
- [Populate in Mongoose](https://mongoosejs.com/docs/populate.html)
