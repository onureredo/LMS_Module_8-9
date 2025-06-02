## CRUD CLI

In this guide, we will build a basic **TypeScript + Node.js** command-line application that mimics **CRUD operations** without using a database. Instead, we will use the local file system to store and manage data.

This will help you understand:

- How to run and organize TypeScript projects with Node.js
- How Node's `fs`, `path`, and `process.argv` work

---

## ⚙️ Step 1: Initialize the Project

### 📁 Create a New Project Directory

```bash
mkdir crud-cli-ts
cd crud-cli-ts
```

### 🛠️ Initialize npm

```bash
npm init -y
```

### 📦 Install Required Dev Dependencies

```bash
npm install -D typescript tsx @types/node
```

- `typescript`: The TypeScript compiler
- `@types/node`: Provides type definitions for Node.js modules (like `fs`, `path`)
- `tsx`: Allows us to run `.ts` files directly without building them first

## Step 2: Setup Project Structure and Config

### 📁 Create the Folder Structure

```bash
mkdir src
cd src
```

Create two files:

```bash
touch cli.ts crud.ts
```

### 📄 Add TypeScript Configuration

In the root directory, create a `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "target": "ESNext",
    "module": "Preserve",
    "moduleDetection": "force",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"]
    }
  },
  "include": ["src"],
  "types": ["node"]
}
```

### 🏃 Add `package.json` Scripts

```json
"scripts": {
  "type-check": "tsc",
  "dev": "tsx src/cli.ts"
}
```

## 📦 Step 3: File System Setup

We will now write logic to **read/write users** from a JSON file using Node's built-in `fs` and `path` modules.

### ❓ What are `fs` and `path`?

- `fs` (File System): Built-in Node.js module to read, write, update files
- `path`: Helps us work with file and folder paths safely

You **don’t need to install** these — they come with Node.js.

### 🧩 Example `crud.ts` Logic

We will write reusable functions like:

- `createUser`
- `listUsers`
- `getUserById`
- `updateUser`
- `deleteUser`

Each user will be stored as an object in a JSON file:

```ts
{
  id: string;
  firstName: string;
  lastName: string;
  age: number;
}
```

We use `randomUUID()` from Node's `crypto` module to generate unique IDs.

## Command Line Logic in `cli.ts`

We parse arguments using `process.argv` and run appropriate logic from `crud.ts`.

Example commands:

```bash
npm run dev create John Doe 30
npm run dev read
npm run dev get <id>
npm run dev update <id> New First New Last 99
npm run dev delete <id>
```

## Step 4: Implementing `crud.ts`

In `crud.ts`, we’ll use three core Node.js modules — no need to install anything extra:

```ts
import fs from 'fs'; // To read/write files
import path from 'path'; // To build file paths
import { randomUUID } from 'crypto'; // To generate unique user IDs
```

These are built-in to Node.js, so no additional packages are required.

### ✨ User Type

Let’s define the shape of our user:

```ts
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
};
```

### 🗂️ File Path Setup

We want to store users inside a JSON file under `src/data/users.json`. Here’s how we prepare the path:

```ts
const filePath = path.join(__dirname, 'data', 'users.json');
```

### 📦 Ensuring File Existence

If the `users.json` file or folder doesn’t exist, we create them:

```ts
function ensureFileExists() {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, '[]');
  }
}
```

We use `mkdirSync` to make sure the parent folder exists, and `writeFileSync` to create an empty array (`[]`) inside the JSON file.

### 📥 Read Users

```ts
function readUsers(): User[] {
  ensureFileExists();
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}
```

Reads the file content, parses the JSON, and returns an array of users.

### 📤 Write Users

```ts
function writeUsers(users: User[]): void {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}
```

Writes a formatted user array back into the file (`null, 2` adds nice indentation for readability).

### ✅ Create a User

```ts
export function createUser(
  firstName: string,
  lastName: string,
  age: number
): User {
  const users = readUsers();
  const newUser: User = {
    id: randomUUID(),
    firstName,
    lastName,
    age,
  };
  users.push(newUser);
  writeUsers(users);
  return newUser;
}
```

We generate a unique `id` using `randomUUID`, and append the new user to the list.

### 📚 List All Users

```ts
export function listUsers(): User[] {
  return readUsers();
}
```

Simply returns all stored users.

### 🔍 Get a User by ID

```ts
export function getUserById(id: string): User | undefined {
  return readUsers().find((user) => user.id === id);
}
```

Searches for a user by their `id`.

### 🔁 Update a User

```ts
export function updateUser(
  id: string,
  updatedData: Partial<Omit<User, 'id'>>
): User | null {
  const users = readUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return null;

  users[index] = { ...users[index], ...updatedData };
  writeUsers(users);
  return users[index];
}
```

Allows partial updates — for example, just updating a first name is enough.

### 🗑️ Delete a User

```ts
export function deleteUser(id: string): boolean {
  const users = readUsers();
  const filtered = users.filter((user) => user.id !== id);
  if (filtered.length === users.length) return false;
  writeUsers(filtered);
  return true;
}
```

Deletes the user by ID and returns whether the operation succeeded.

🎉 That’s it!  
Your `crud.ts` module is now complete, and you can start using these operations in your CLI script (`cli.ts`) in the next step.

## Step 5: CLI Command Handling

In this step, we move from simple function calls to a command-line interface (CLI) experience using `process.argv`. This allows users to interact with our CRUD functions directly from the terminal.

### 🎯 Goal

Make the `crud.ts` logic accessible through CLI by implementing command parsing in `cli.ts`.

### 📁 File Structure

```
src/
├── crud.ts     # Contains all CRUD functions
└── cli.ts      # Parses CLI input and calls the appropriate CRUD function
```

### 📄 `cli.ts` Overview

This file reads the user input from the terminal (using `process.argv`), interprets it, and then calls the corresponding function from `crud.ts`.

We use:

- `process.argv`: A built-in Node.js array that contains command-line arguments.
- Basic `switch` logic to route commands.

### 📦 Commands Supported

```bash
npm run dev create John Doe 30         # ➕ Adds a new user
npm run dev read                       # 📄 Lists all users
npm run dev get <id>                   # 🔍 Get a single user by ID
npm run dev update <id> New Name 25    # 🔁 Updates a user
npm run dev delete <id>                # 🗑️ Deletes a user
```

### 🚀 Example

```bash
npm run dev create John Doe 30
# ✅ Created: { id: '...', firstName: 'John', lastName: 'Doe', age: 30 }

npm run dev read
# 📄 All Users:
# 1: John Doe (30)

npm run dev get 1
# 🔍 Found: { id: '1', firstName: 'John', lastName: 'Doe', age: 30 }

npm run dev update 1 Jane Doe 29
# 🔁 Updated: { id: '1', firstName: 'Jane', lastName: 'Doe', age: 28 }

npm run dev delete 1
# 🗑️ User deleted
```

### Summary

- CLI logic is separated into its own file for clarity.
- Each command-line instruction is parsed and handled cleanly.
- Prepares students to later swap this CLI with real HTTP routes using Express.

You can now test your CRUD system entirely from the terminal!
