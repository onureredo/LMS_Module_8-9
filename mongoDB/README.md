# 📚 MongoDB

Welcome to our introductory lecture on MongoDB. MongoDB is a popular NoSQL database known for its flexibility, scalability, and ease of use. It stores entries as documents and groups them in collections.

## 📖 Documents and Collections

### Documents

- **Structure**: In MongoDB, data is stored in documents, which are JSON-like objects. A document consists of field-value pairs.
- **Size Limit**: Each document has a maximum size limit of 16MB.
- **Dot Notation**: This allows you to access nested fields within a document.
- **Embedded Documents**: Documents can contain other documents, allowing you to store related data together.

### Collections

- A **collection** is a group of documents, similar to a table in a relational database.
- Collections do not enforce a schema, meaning documents within a collection can have different structures.

## 🛠️ CRUD Operations

MongoDB supports the basic CRUD operations: Create, Read, Update, and Delete.

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
```

### 📖 Reading Documents

```js
// Find all posts by user with user_id 1
db.posts.find({ user_id: 1 });

// Find a specific post by title
db.posts.find({ title: 'My First Post' });

// Find posts with a specific tag
db.posts.find({ tags: 'introduction' });
```

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

### 🗑️ Deleting Documents

```js
// Delete a specific post by title
db.posts.deleteOne({ title: 'Updated Title for My First Post' });

// Delete all posts by user_id 1
db.posts.deleteMany({ user_id: 1 });
```

## 🔍 Advanced Queries and Features

### Aggregation

MongoDB provides powerful aggregation capabilities to perform operations on data and return computed results.

```js
// Example: Count the number of posts per user
db.posts.aggregate([{ $group: { _id: '$user_id', post_count: { $sum: 1 } } }]);
```

### Text Search

MongoDB supports text search to find documents that contain specific words.

```js
// Example: Search for posts containing the word "content"
db.posts.createIndex({ content: 'text' });
db.posts.find({ $text: { $search: 'content' } });
```

### Geospatial Queries

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

// Create a geospatial index on the location field
db.restaurants.createIndex({ location: '2dsphere' });
```

**Performing a Geospatial Query**

```js
// Find restaurants near a specific location (longitude, latitude)
db.restaurants.find({
  location: {
    $near: {
      $geometry: { type: 'Point', coordinates: [-73.961704, 40.662942] },
      $maxDistance: 5000, // 5 kilometers
    },
  },
});
```

## ⚡ High Availability and Scalability

### High Availability by Replication

Replication: MongoDB achieves high availability through replication. A replica set is a group of MongoDB servers that maintain the same data. If the primary server fails, one of the secondary servers automatically becomes the new primary, ensuring continuous availability.

### Horizontal Scaling

Horizontal Scaling: MongoDB supports horizontal scaling through sharding. Sharding splits data across multiple servers, or shards, allowing the database to handle large volumes of data and high-throughput operations efficiently.

## ✅ Conclusion

MongoDB is a powerful NoSQL database that offers flexibility, scalability, and a wide range of features to handle various data needs. By understanding the basics of documents, collections, CRUD operations, and advanced queries, you can start leveraging MongoDB in tandem with an Express-powered API to create fast and scalable applications. You can go deeper with [their official training materials](https://learn.mongodb.com/).
