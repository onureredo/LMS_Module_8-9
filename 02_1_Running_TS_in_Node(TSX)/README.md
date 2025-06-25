# 📚 Running TypeScript in Node.js

TypeScript helps you catch bugs early and write more predictable code — but how do you actually run `.ts` files in a Node.js project?

In this lecture, you will learn to run TypeScript files directly in Node.js using the [`tsx`](https://tsx.is/getting-started) tool — without compiling them manually.

## Initialise Your Project

Before installing anything, create a new folder and initialise a Node.js project:

```bash
mkdir my-ts-app && cd my-ts-app
npm init -y
```

## **Install Dependencies**

```bash
npm install tsx
	# → ✅ required at runtime

npm install -D @types/node
	# → 🛠️ used only during development
```

- `typescript`: The TypeScript compiler
- `tsx`: Run TypeScript directly without building
- `@types/node`: Type definitions so TypeScript understands Node.js APIs

> -D marks as development-only dependencies.

## **Create a Simple TypeScript File**

Create a file called `index.ts`:

```tsx
const message: string = 'Hello from TypeScript!';
console.log(message);
```

## **Run the File Using `tsx`**

```bash
npx tsx index.ts
```

> ✅ That's it! No need to compile manually. tsx handles it for you behind the scenes.

### **❓ Why Use `tsx`?**

Without `tsx`, you'd normally do this:

```bash
tsc index.ts      # Compile to index.js
node index.js     # Then run it
```

With `tsx`, you can skip the build step and run TypeScript files just like JavaScript.

> ✂️ tsx performs type stripping — it removes all TypeScript-specific types (like string, number, interfaces etc.) on the fly and executes the remaining valid JavaScript.
>
> This means your `.ts` files are instantly executable while still benefiting from TypeScript's type safety during development.

## **Debugging and Type Safety**

Even though `tsx` strips types at runtime and runs the JavaScript directly:

- You **will still see type errors while coding** thanks to your IDE (e.g. **VSCode**).
- However, `tsx` **does not stop execution** if type errors exist — it's not a type checker.

> 🧠 To catch type errors before running your code, rely on your IDE or run:
>
> ```bash
> npx tsc --noEmit
> ```
>
> This checks for TypeScript errors without producing any `.js` output.

## **Automate with `package.json`**

Instead of typing `npm tsx` and `npm tsc` every time, you can add a script to your `package.json`:

### **📄 Example `package.json`**

```json
{
  "name": "my-ts-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "type-check": "tsc",
    "dev": "tsx watch index.ts"
  }
}
```

Then run your app with:

```bash
npm run dev
```

and type check with:

```bash
npm run type-check
```

> 🔁 The watch flag automatically reloads your code whenever you save changes.

### **📄 Adding a `tsconfig.json` File**

Although `tsx` can run TypeScript files without a `tsconfig.json`, adding one gives you more control over how TypeScript behaves.

### **❓ Why Use a `tsconfig.json`?**

- Define how your TypeScript should be compiled
- Enable strict type-checking options
- Improve editor support (like autocompletion and linting in VSCode)
- Better structure and consistency as your project grows

### **📄 Example `tsconfig.json`**

```json
{
  "compilerOptions": {
    "strict": true, // Enable all strict type-checking options
    "noEmit": true, // Do not output compiled files; useful with tools like tsx
    "target": "ESNext", // Use the latest JavaScript features
    "moduleDetection": "force", // Treat all files as modules
    "module": "Preserve", // Keep import/export syntax as-is (useful for ESM)
    "resolveJsonModule": true, // Allow importing .json files
    "esModuleInterop": true, // Enable interoperability between CommonJS and ES Modules
    "isolatedModules": true, // Ensure each file can be safely transpiled independently
    "skipLibCheck": true, // Skip type checking of declaration files (.d.ts)
    "baseUrl": "./src", // Set base directory for resolving non-relative imports
    "paths": {
      "@/*": ["*"] // Alias '@/' to point to 'src/' directory
    },
    "types": ["node"] // Include Node.js type definitions globally
  },
  "include": ["src"] // Include all files in the 'src' directory
}
```

### **❓ Why Do We Need `@types/node`?**

TypeScript doesn't know about built-in Node.js features by default. Without `@types/node`, you'll see errors like:

```jsx
console.log(process.env.NODE_ENV); // ❌ Error: Cannot find name 'process’
```

Installing `@types/node` gives TypeScript full awareness of Node-specific globals like:

- `process`, `__dirname`, `global`
- Built-in modules like `fs`, `path`, `http`, etc.

It ensures your code can be type-checked properly in a Node environment and improves developer experience in your IDE.

### **❓ What Does `type-check` Do?**

The `type-check` script runs:

```bash
tsc
```

This uses your `tsconfig.json` file and checks for any type errors across your project.

Because we use `"noEmit": true`, it won’t generate `.js` files — it only validates types.

> 💡 You can use this script before commits or deployments to catch bugs early.

# **Summary**

This guide helps you set up and run TypeScript code directly in Node.js using the `tsx` tool — with no need to compile manually.

### **Installed Packages**

```bash
npm install tsx
	# → ✅ required at runtime

npm install -D typescript @types/node
	# → 🛠️ used only during development
```

- `typescript`: TypeScript compiler for type-checking
- `tsx`: Runs TypeScript files instantly, stripping types on the fly
- `@types/node`: Enables awareness of Node.js built-in features (like `process`, `fs`, etc.)

### **File Structure**

```bash
📁 my-ts-app
├── 📄 package.json
├── 📄 tsconfig.json
└── 📁 src
    └── 📄 index.ts
```

### **Scripts in `package.json`**

```json
"scripts": {
  "type-check": "tsc",
  "dev": "tsx --watch src/index.ts"
}
```
