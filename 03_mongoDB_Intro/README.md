# 📚 MongoDB Introduction

Welcome to our introductory lecture on MongoDB. MongoDB is a popular NoSQL database known for its flexibility, scalability, and ease of use. It stores entries as **documents** and groups them in **collections**.

## 📖 Documents and Collections

### 🧾 Documents

- **Structure**: Data is stored in documents, which are JSON-like objects made up of field-value pairs.
- **Size Limit**: Each document can be up to 16MB in size.
- **Dot Notation**: Used to access nested fields.
- **Embedded Documents**: Documents can contain other documents.

### 📦 Collections

- A **collection** is a group of documents, like a table in relational databases.
- MongoDB collections are schema-less: documents can have different structures.
- MongoDB automatically creates a collection when a document is inserted for the first time.

## 🛠️ CRUD Operations

MongoDB supports the basic CRUD operations: Create, Read, Update, and Delete.

## 📥 CREATE — Inserting Documents

**Insert One**

```js
// Insert a single document into the "posts" collection
// Note: if the "posts" collection does not exist yet, it will be created automatically

db.posts.insertOne({
  user_id: 1,
  title: 'My First Project',
  content: 'This is the content of my first project',
  tags: ['intro', 'mongodb'],
  created_at: new Date(),
});
```

**Insert Many**

```js
// Insert multiple documents into the "posts" collection
db.posts.insertMany([
  {
    user_id: 1,
    title: 'Second Project',
    content: 'More content here',
    tags: ['update'],
    created_at: new Date()
  },
  {
    user_id: 2,
    title: 'Another User Post',
    content: 'Another user's content',
    tags: ['guest'],
    created_at: new Date()
  }
]);
```

## 📖 READ — Finding Documents

**Find Multiple Documents**

```js
// Find all posts by user with user_id 1
db.posts.find({ user_id: 1 });

// Find posts with a specific tag
db.posts.find({ tags: 'introduction' });
```

**Find One Document**

```js
// Find a specific post by title
db.posts.findOne({ title: 'My First Post' });

// Find the first post made by user with user_id 2
db.posts.findOne({ user_id: 2 });
```

## 🔄 UPDATE — Modifying Documents

**Update One**

```js
// Update the title of a post
db.posts.updateOne(
  { title: 'My First Project' },
  { $set: { title: 'Updated Project Title' } }
);
```

**Update Many**

```js
// Add a new tag to all posts by user_id 1
db.posts.updateMany({ user_id: 1 }, { $addToSet: { tags: 'user_post' } });
```

## 🗑️ DELETE — Removing Documents

**Delete One**

```js
// Delete a post by title
db.posts.deleteOne({ title: 'Updated Project Title' });
```

**Delete Many**

```js
// Delete all posts by a specific user
db.posts.deleteMany({ user_id: 1 });
```

## 🔍 Advanced Queries and Features

### 📊 Aggregation

Aggregation in MongoDB is used to **process and transform data** from a collection.  
It allows you to perform operations like filtering, grouping, and calculating summary values (e.g. total, average, count).

> 🧠 Think of it like performing SQL operations such as `GROUP BY`, `SUM()`, or `COUNT()` — but using MongoDB's aggregation pipeline syntax.

```js
// Count how many posts each user has
db.posts.aggregate([{ $group: { _id: '$user_id', post_count: { $sum: 1 } } }]);
```

## 🔎 Text Search

```js
// Create a text index for the "content" field
db.posts.createIndex({ content: 'text' });

// Search posts that include the word "project"
db.posts.find({ $text: { $search: 'project' } });
```

## 🗺️ Geospatial Query

Let’s create a new collection called restaurants and perform a geospatial query.

**Creating the restaurants Collection and Inserting Documents**

```js
db.restaurants.insertMany([
  {
    name: 'Pizza Palace',
    location: { type: 'Point', coordinates: [-73.856077, 40.848447] },
  },
  {
    name: 'Burger Barn',
    location: { type: 'Point', coordinates: [-73.961704, 40.662942] },
  },
  {
    name: 'Taco Town',
    location: { type: 'Point', coordinates: [-73.982419, 40.579505] },
  },
]);
```

**Performing a Geospatial Query**

```js
// Find restaurants near a specific location (longitude, latitude)
db.restaurants.find({
  location: {
    $near: {
      $geometry: { type: 'Point', coordinates: [-73.961704, 40.662942] },
      $maxDistance: 5000,
    },
  },
});
```

## ⚙️ High Availability and Scalability

### 🔁 Replication

MongoDB uses **replica sets** to ensure high availability. If the primary server fails, a secondary automatically takes over.

### 📈 Sharding

MongoDB supports **horizontal scaling** via sharding. This distributes data across multiple servers.

## Conclusion

MongoDB is a powerful NoSQL database that offers flexibility, scalability, and a wide range of features to handle various data needs. By understanding the basics of documents, collections, CRUD operations, and advanced queries, you can start leveraging MongoDB in tandem with an Express-powered API to create fast and scalable applications. You can go deeper with [their official training materials](https://learn.mongodb.com/).
