# 🚀 Running TypeScript in Node.js with tsx

To run a `.ts` file directly in Node.js without compiling it manually, we will use a tool called [**tsx**](https://tsx.is/getting-started).

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

> ✂️ `tsx` performs **type stripping** — it removes all TypeScript-specific types (like `string`, `number`, interfaces etc.) on the fly and executes the remaining valid JavaScript.  
> This means your `.ts` files are instantly executable while still benefiting from TypeScript's type safety during development.

## 🔍 Debugging and Type Safety

Even though `tsx` strips types at runtime and runs the JavaScript directly:

- ✅ You **will still see type errors while coding** thanks to your IDE (e.g. **VSCode**).
- ❌ However, `tsx` **does not stop execution** if type errors exist — it's not a type checker.

> 🧠 To catch type errors before running your code, rely on your IDE or run:
>
> ```bash
> npx tsc --noEmit
> ```
>
> This checks for TypeScript errors without producing any `.js` output.

## 🧠 Bonus: Automate with `package.json`

Instead of typing `npx tsx` every time, you can add a script to your `package.json`:

### 📄 Example `package.json`

```json
{
  "name": "my-ts-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx watch index.ts"
  },
  "devDependencies": {
    "tsx": "^4.0.0"
  }
}
```

Then run your app with:

```bash
npm run dev
```

> 🔁 The `watch` flag automatically reloads your code whenever you save changes.
