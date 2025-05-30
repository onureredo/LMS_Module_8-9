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

> Next step: connect to MongoDB and implement basic CRUD operations.
