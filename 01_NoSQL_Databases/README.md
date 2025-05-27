# 🗂️ NoSQL Databases

Welcome to the introduction to NoSQL databases. In this section, we will explore what NoSQL means, how it differs from traditional relational databases, and why it's used in modern web applications.

## From Relational to NoSQL

By now, you’re familiar with **relational databases (RDBMS)** — systems like MySQL or PostgreSQL that store data in tables with strict schemas.

But what happens when:

- Your data structure changes frequently?
- You don’t want to deal with complex JOINs?
- You need to handle huge volumes of data in real-time?
- You want to scale across multiple servers easily?

This is where **NoSQL** databases come in.

NoSQL (short for "Not Only SQL") refers to a family of databases that offer flexible, scalable alternatives to traditional relational databases.

## Relational vs Non-Relational

| Feature        | Relational (SQL)                  | Non-Relational (NoSQL)                            |
| -------------- | --------------------------------- | ------------------------------------------------- |
| Data Structure | Tables (rows & columns)           | Documents, key-value pairs, graphs, etc.          |
| Schema         | Fixed, predefined                 | Flexible, dynamic                                 |
| Relationships  | JOIN operations                   | Embedded documents or manual references           |
| Scalability    | Vertical (scale-up)               | Horizontal (scale-out)                            |
| Query Language | SQL                               | Varies by DB (MongoDB, Redis, etc.)               |
| Best For       | Structured data & complex queries | High volume, unstructured or semi-structured data |

---

## Key Features of NoSQL Databases

- **Schema flexibility** — You can store different fields in each document.
- **Horizontal scalability** — Easy to distribute data across many servers.
- **High performance** — Especially for large-scale, real-time applications.
- **Designed for cloud** — NoSQL solutions are built for distributed infrastructure.

## Types of NoSQL Databases

### 📄 Document-Based

- Data stored as JSON-like documents (BSON in MongoDB)
- Great for hierarchical or nested data
- 🧪 Example: **MongoDB**

```json
{
  "title": "Intro to NoSQL",
  "tags": ["database", "nosql"],
  "author": {
    "name": "Onur",
    "id": 1
  }
}
```

### 🗝️ Key-Value Stores

- Each item is stored as a key and a value.
- Very fast and simple lookups.
- 🧪 Example: **Redis**

### 📊 Column Stores

- Data stored in columns instead of rows (like in SQL).
- Great for analytics and aggregation queries.
- 🧪 Example: **Cassandra**

### 🧭 Graph Databases

- Data stored as nodes and edges.
- Best for highly interconnected data (e.g. social networks).
- 🧪 Example: **Neo4j**

## 🍃 Why NoSQL? (When to Use)

You might choose a NoSQL database when:

- Your data structure is dynamic or semi-structured
- You need to scale horizontally across servers
- You want faster development cycles (no migrations for schema changes)
- You are working with big data, real-time analytics, or high write loads

## 🧠 Common NoSQL Examples

| Database  | Type      | Use Case                                |
| --------- | --------- | --------------------------------------- |
| MongoDB   | Document  | Web apps, content management            |
| Redis     | Key-Value | Caching, real-time data                 |
| Cassandra | Column    | Analytics at scale                      |
| Neo4j     | Graph     | Social networks, recommendation engines |

## ✅ Summary

- NoSQL databases offer a flexible alternative to traditional SQL databases.
- There are different types of NoSQL databases optimized for different use cases.
- Understanding the core differences helps you decide when and how to use them effectively.
- In this course, we’ll focus primarily on **MongoDB**, a powerful document-based NoSQL database.
