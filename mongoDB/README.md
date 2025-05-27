# 📚 MongoDB Lecture Notes

MongoDB is a popular NoSQL database known for its flexibility, scalability, and ease of use. It stores data in **documents**, grouped into **collections**.

---

## 📖 Documents and Collections

In MongoDB, data is stored in JSON-like structures called **documents**, made up of field-value pairs.

**Example JSON document:**

```json
{
  "title": "Learning MongoDB",
  "content": "Introduction to MongoDB features",
  "tags": ["MongoDB", "NoSQL"],
  "author": { "name": "Jorge", "id": 1 }
}
```

A **collection** is a group of documents. Unlike relational databases, collections do not enforce a fixed schema—documents within a collection can have different structures.

---

## 🛠️ CRUD Operations

CRUD stands for:

- **Create**: Add new documents
- **Read**: Query existing documents
- **Update**: Modify existing documents
- **Delete**: Remove documents

🧠 Think of CRUD operations like managing social media posts:

- Create → Publishing a post
- Read → Viewing posts
- Update → Editing a post
- Delete → Deleting a post

---

### 📥 Inserting Documents

**Insert One**

```js
db.posts.insertOne({
  user_id: 1,
  title: 'My First Post',
  content: 'This is the content of my first post',
  tags: ['introduction', 'first'],
  created_at: new Date(),
});
// This command inserts a single document into the "posts" collection.
```

**Insert Many**

```js
db.posts.insertMany([
  {
    user_id: 1,
    title: 'My Second Post',
    content: 'This is the content of my second post',
    tags: ['update', 'second'],
    created_at: new Date(),
  },
  {
    user_id: 2,
    title: "Another User's Post",
    content: 'Content from another user',
    tags: ['guest', 'another'],
    created_at: new Date(),
  },
]);
// This inserts multiple documents into the "posts" collection.
```

---

### 📖 Reading Documents

```js
// Find all posts by user with user_id 1
db.posts.find({ user_id: 1 });

// Find a specific post by title
db.posts.find({ title: 'My First Post' });

// Find posts with a specific tag
db.posts.find({ tags: 'introduction' });
```

---

### 🔄 Updating Documents

```js
// Update the title of a specific post
db.posts.updateOne(
  { title: 'My First Post' },
  { $set: { title: 'Updated Title for My First Post' } }
);

// Add a new tag to all posts by user_id 1
db.posts.updateMany({ user_id: 1 }, { $addToSet: { tags: 'user1_posts' } });
```

---

### 🗑️ Deleting Documents

```js
// Delete a specific post by title
db.posts.deleteOne({ title: 'Updated Title for My First Post' });

// Delete all posts by user_id 1
db.posts.deleteMany({ user_id: 1 });
```

---

## 🔍 Advanced Queries: Aggregation

Aggregation is used to process data and return computed results. MongoDB provides powerful aggregation capabilities to perform operations on data and return computed results.

```js
db.posts.aggregate([{ $group: { _id: '$user_id', post_count: { $sum: 1 } } }]);
// This groups posts by user and counts how many posts each user has.
```

---

## 🌍 Geospatial Queries

```js
// Insert restaurants with location data
db.restaurants.insertMany([
  {
    name: 'Pizza Palace',
    location: { type: 'Point', coordinates: [-73.856077, 40.848447] },
  },
]);

// Create geospatial index
db.restaurants.createIndex({ location: '2dsphere' });

// Find nearby restaurants
db.restaurants.find({
  location: {
    $near: {
      $geometry: { type: 'Point', coordinates: [-73.961704, 40.662942] },
      $maxDistance: 5000,
    },
  },
});
```

---

## ⚡ High Availability & Scalability

MongoDB ensures:

- **High Availability via Replication**: A _replica set_ contains multiple MongoDB servers with identical data. If the primary server fails, a secondary takes over automatically.

- **Horizontal Scaling via Sharding**: Data is distributed across multiple servers. This helps handle high throughput and large datasets.

**Example analogy:**  
Social media platforms like Twitter use replication and sharding to handle massive user bases and ensure constant uptime.

---

## ✅ Conclusion

MongoDB is a powerful NoSQL database suited for modern, scalable applications. With its document-based structure, support for complex queries, and built-in scalability features, MongoDB is a solid choice for developers working with APIs and dynamic data.
