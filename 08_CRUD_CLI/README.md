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

Explanation:

- `typescript`: The TypeScript compiler
- `@types/node`: Provides type definitions for Node.js modules (like `fs`, `path`)
- `tsx`: Allows us to run `.ts` files directly without building them first

## 📐 Step 2: Setup Project Structure and Config

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

Now you can run your CLI using:

```bash
npm run dev create John Doe 30
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

## ⌨️ Step 4: Command Line Logic in `cli.ts`

We parse arguments using `process.argv` and run appropriate logic from `crud.ts`.

Example commands:

```bash
npm run dev create John Doe 30
npm run dev read
npm run dev get <id>
npm run dev update <id> New First New Last 99
npm run dev delete <id>
```

> You’ll see full implementation of these steps in this repo.
