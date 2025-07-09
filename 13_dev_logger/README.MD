# 📘 Dev Logger Exercise Guide

## 🎯 Purpose

A focused exercise to:

- Understand `package.json` conditional imports using `--conditions`
- Explore `.env` files in different environments
- Practise script lifecycle and build automation in a Node.js + TypeScript app
- Learn why **barrel files** (e.g. `index.ts`) are important for clean import resolution

---

## 🚀 What Happens When You Run `npm start`?

When you execute:

```bash
npm start
```

This triggers a chain of scripts:

1. **`prestart`** runs automatically

   - Which itself runs `npm run build`

2. **`build`** runs

   - Before `build`, `prebuild` is triggered

3. **`prebuild`** deletes the `dist/` folder
4. Then `tsc` compiles the TypeScript files into `dist/`
5. Finally, `start` executes the compiled app with production `.env` and conditions

✅ This chain ensures you always start from a clean, freshly built codebase.

---

## 📁 Project Structure

```
📦 dev-logger
├── package.json
├── tsconfig.json
├── .env.development.local
├── .env.production.local
├── 📁 src
│   ├── app.ts
│   ├── config/
│   │   └── index.ts
│   └── utils/
│       ├── logger.ts
│       └── index.ts   <-- Barrel file for `#utils`
├── 📁 dist
```

---

## ⚙️ Scripts Breakdown (from `package.json`)

```json
"scripts": {
  "dev": "node --watch --conditions development --experimental-transform-types --disable-warning=ExperimentalWarning --env-file=.env.development.local src/app.ts",
  "prebuild": "rm -rf dist",
  "build": "tsc",
  "prestart": "npm run build",
  "start": "node --conditions production --env-file=.env.production.local dist/app.js"
}
```

### 🔄 How They Work:

- **`dev`**

  - Runs `src/app.ts` in development mode
  - Uses TypeScript source directly
  - Loads env from `.env.development.local`
  - `--conditions development` triggers development-only `#import` paths

- **`prebuild`**

  - Deletes the `dist/` folder before every build (clean build)

- **`build`**

  - Runs the TypeScript compiler to emit `.js` files to `dist/`

- **`prestart`**

  - Automatically runs before `start`
  - This is why `npm start` triggers a build first

- **`start`**

  - Runs the compiled `dist/app.js` in production mode
  - Loads `.env.production.local`
  - Uses `--conditions production` to switch to `dist/` paths

---

## 📦 Barrel Files: Why Are They Important?

In this setup, the `#config` alias worked **without a barrel file** because:

- The import points to `config/index.ts` explicitly (index is default).

However, for `#utils`, we initially tried:

```ts
import { logger } from '#utils';
```

Which failed ❌ because there was no `index.ts` in `utils/`.

✅ **Fix:** We added a barrel file:

```ts
// src/utils/index.ts
export * from './logger';
```

This made `#utils` point to a resolvable file and allowed the import to work.

👉 **Rule of thumb:** For alias imports like `#utils`, always provide an `index.ts` barrel when pointing to a folder.

---

## 📂 Files

### `src/config/index.ts`

```ts
export const MODE = process.env.MODE;
```

### `src/utils/logger.ts`

```ts
export const logger = (msg: string) => {
  const timestamp = new Date().toLocaleString();
  console.log(`[${timestamp}] ${msg}`);
};
```

### `src/utils/index.ts`

```ts
export * from './logger';
```

### `src/app.ts`

```ts
import { MODE } from '#config';
import { logger } from '#utils';

logger(`App is running in MODE: ${MODE?.toUpperCase()}`);
```

---

## 🌍 `.env` Files

### `.env.development.local`

```
MODE=development
```

### `.env.production.local`

```
MODE=production
```

---

## 🧪 Expected Output

### `npm run dev`

```
[27.6.2025, 16:30:00] App is running in MODE: DEVELOPMENT
```

### `npm start`

```
[27.6.2025, 16:31:00] App is running in MODE: PRODUCTION
```

---

## ✅ Summary

- We used `--conditions` with `package.json` imports to switch between environments
- `logger.ts` was used via a barrel file to enable clean import aliasing
- Scripts like `prestart`, `build`, and `start` form a seamless lifecycle
- `.env` variables were used to control logic without needing `cross-env`

👏 Nice work!
