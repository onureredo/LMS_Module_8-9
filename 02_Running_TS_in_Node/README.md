# 🚀 Running TypeScript in Node.js with tsx

To run a `.ts` file directly in Node.js without compiling it manually, we use a tool called **tsx**.

## 📦 Step 1: Install `tsx`

```bash
npm install -D tsx
```

> `-D` means it's a dev dependency — only needed during development.

## 🛠️ Step 2: Create a Simple TypeScript File

Create a file called `index.ts`:

```ts
const message: string = 'Hello from TypeScript!';
console.log(message);
```

## ▶️ Step 3: Run the File Using `tsx`

```bash
npx tsx index.ts
```

> ✅ That's it! No need to compile manually. `tsx` handles it for you behind the scenes.

## ❓ Why Use `tsx`?

Without `tsx`, you'd normally do this:

```bash
tsc index.ts      # Compile to index.js
node index.js     # Then run it
```

With `tsx`, you can skip the build step and run TypeScript files just like JavaScript.

---

## Summary

- `tsx` lets you run TypeScript files directly
- No need for manual compilation
- Great for simple scripts, quick testing, and development
