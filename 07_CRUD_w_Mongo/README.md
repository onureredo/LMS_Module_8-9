# 🛒 Exercise: CRUD Operations with MongoDB

## 🎯 Goal

Practice basic Create, Read, Update, and Delete (CRUD) operations using MongoDB in an eCommerce context. You will interact with the `products` collection to manage a basic product inventory.

> 🧰 This can be done using the **MongoDB Shell**, **VSCode MongoDB Playground**, or **MongoDB Compass Shell** (found in the Compass interface).

> 💡 [How to install MongoDB VS Code Plugin](https://www.youtube.com/watch?v=MLWlWrRAb4w)

---

## 📦 Collection: `products`

Each document in the `products` collection should follow this structure:

```js
{
  name: 'T-Shirt',
  price: 19.99,
  stock: 50,
  tags: ['clothing', 'unisex'],
  created_at: new Date()
}
```

---

## ✅ 1. CREATE

### ➕ Insert a single product:

```js
db.products.insertOne({
  name: 'T-Shirt',
  price: 19.99,
  stock: 50,
  tags: ['clothing', 'unisex'],
  created_at: new Date(),
});
```

### ➕ Insert multiple products:

```js
db.products.insertMany([
  {
    name: 'Hoodie',
    price: 34.99,
    stock: 30,
    tags: ['clothing', 'winter'],
    created_at: new Date(),
  },
  {
    name: 'Sneakers',
    price: 59.99,
    stock: 20,
    tags: ['shoes', 'sport'],
    created_at: new Date(),
  },
  {
    name: 'Cap',
    price: 14.99,
    stock: 100,
    tags: ['accessory', 'summer'],
    created_at: new Date(),
  },
]);
```

---

## 🔍 2. READ

### 🔎 Find all products:

```js
db.products.find();
```

### 🔎 Find products by tag:

```js
db.products.find({ tags: 'clothing' });
```

### 🔎 Find products with stock > 0:

```js
db.products.find({ stock: { $gt: 0 } });
```

### 🔎 Find products within a price range:

```js
db.products.find({ price: { $gte: 10, $lte: 40 } });
```

---

## 🔄 3. UPDATE

### ✏️ Update one product’s stock:

```js
db.products.updateOne({ name: 'T-Shirt' }, { $set: { stock: 45 } });
```

### ✏️ Add a tag to all clothing products:

```js
db.products.updateMany({ tags: 'clothing' }, { $addToSet: { tags: 'sale' } });
```

---

## 🗑️ 4. DELETE

### ❌ Delete a product by name:

```js
db.products.deleteOne({ name: 'Cap' });
```

### ❌ Delete all products out of stock:

```js
db.products.deleteMany({ stock: { $lte: 0 } });
```

---

## 🧠 Bonus Challenges

### 📊 Find the most expensive product:

```js
db.products.find().sort({ price: -1 }).limit(1);
```

### 📊 Group products by tag and count:

```js
db.products.aggregate([
  { $unwind: '$tags' },
  { $group: { _id: '$tags', count: { $sum: 1 } } },
]);
```

---

## ✅ Outcome

By completing this exercise, you will:

- Understand how to use MongoDB’s CRUD operations
- Be able to manipulate and query product documents
- Use MongoDB shell commands in practical scenarios
