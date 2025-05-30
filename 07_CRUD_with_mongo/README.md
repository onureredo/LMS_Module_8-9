# TypeScript + Node.js Setup

Before diving into database operations, let's start with a basic TypeScript + Node.js setup to create a clean environment for our future MongoDB CRUD logic.

## ⚙️ Step 1: Initialize the Project

```bash
npm init -y
```

## 📦 Step 2: Install Required Packages

### Runtime Packages

```bash
npm install tsx
```

### Dev Dependencies

```bash
npm install -D typescript @types/node
```

- `typescript`: The TypeScript compiler.
- `@types/node`: Provides type definitions for Node.js modules like `fs`, `path`, etc.
- `tsx`: Allows running `.ts` files directly without pre-compiling.

## 📁 Step 3: Create the Project Structure

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

## 🔧 Step 4: Add a TypeScript Config File

Create a `tsconfig.json` in your root directory:

```json
{
  "compilerOptions": {
    "strict": true, // Enables all strict type-checking options
    "noEmit": true, // Do not output files after compilation
    "target": "ESNext", // Set the JavaScript version to compile to
    "moduleDetection": "force", // Use ECMAScript module resolution
    "module": "Preserve", // Keep import/export statements
    "resolveJsonModule": true, // Allows importing .json files
    "esModuleInterop": true, // Enables compatibility with CommonJS
    "isolatedModules": true, // Ensures every file can be safely transpiled
    "skipLibCheck": true, // Skip type checking of declaration files
    "baseUrl": "./src", // Base path for module resolution
    "paths": {
      "@/*": ["*"] // Shortcut alias for imports
    }
  },
  "include": ["src"] // Include only the src folder
}
```

## 🚀 Step 5: Run the App with `npm script`

Edit your `package.json`:

```json
{
  "name": "ts-node-setup",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "type-check": "tsc --noEmit",
    "dev": "tsx watch src/index.ts"
  },
  "devDependencies": {
    "@types/node": "^22.15.19",
    "tsx": "^4.19.4",
    "typescript": "^5.8.3"
  }
}
```

Then run:

```bash
npm run dev
```

## ❓ Why use `tsx`?

Normally, you'd have to do:

```bash
tsc src/index.ts     # Compiles to index.js
node src/index.js    # Then run the JS
```

But `tsx` does type-stripping and lets you run `.ts` files directly — no build step needed. It's perfect for development.

> 💡 You can’t catch TypeScript errors at runtime. So always rely on your IDE (like VSCode) and `tsc` to show type errors beforehand.
