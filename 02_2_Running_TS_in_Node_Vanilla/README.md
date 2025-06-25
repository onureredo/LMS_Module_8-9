# 📚 Running TypeScript in Node

TypeScript helps you catch bugs early and write more predictable code — but how do you actually run `.ts` files in a Node.js project?

This guide walks you through setting up and running TypeScript in Node.js using Node’s native support for ES Modules and experimental TypeScript flags — with optional compilation using `tsc` for production.

## Initialise Your Project

Before installing anything, create a new folder and initialise a Node.js project:

```bash
mkdir my-ts-app && cd my-ts-app
npm init -y
```

### **Install Dependencies**

```bash
npm install -D typescript @types/node
```

`typescript`: The TypeScript compiler

`@types/node`: Type definitions so TypeScript understands Node.js APIs

-D marks as development-only dependencies.

### File Structure Example

```bash
📁 project-root/
├── 📁 node_modules/     # Installed dependencies (ignored by Git)
├── 📄 .gitignore        # Files/folders to exclude from Git
├── 📄 package.json      # Project metadata and scripts
├── 📄 tsconfig.json     # TypeScript configuration
└── 📁 src/              # Source files
    └── 📄 app.ts        # Main entry point
```

### Understanding `package.json`

Before we dive into the actual content of this file, let’s pause and reflect on what you’ve experienced so far:

- In your frontend **React projects** with Vite, the `package.json` file was already there — preconfigured, ready to use. You just ran `npm run dev` and things worked.
- But now that we are working on the backend, things are different. You will write and customise this file yourself — and understand what each script does, step by step.

### Example `package.json`

```json
{
  "name": "my-ts-app",
  "version": "1.0.0",
  "main": "app.ts",
  "type": "module",
  "scripts": {
    "dev": "node --watch --experimental-transform-types --disable-warning=ExperimentalWarning src/app.ts",
    "prebuild": "rm -rf dist",
    "build": "tsc",
    "prestart": "npm run build",
    "start": "node dist/app.js"
  },
  "devDependencies": {
    "@types/node": "^24.0.3",
    "typescript": "^5.8.3"
  }
}
```

### Understanding Your Dev & Build Scripts

- **`dev`** runs your `.ts` file directly using Node’s experimental TypeScript support. Ideal for development.
- **`build`** compiles your TypeScript project into JavaScript files inside the `dist/` folder.
- **`start`** executes the compiled JavaScript version of your app from `dist/app.js`. Used in production.
- **`prebuild`** clears the `dist/` directory before each build, ensuring a clean output.
- **`prestart`** automatically runs `build` before starting the production server.

### Breakdown of the `dev` Script

| **Flag**                                | **Explanation**                                                                        |
| --------------------------------------- | -------------------------------------------------------------------------------------- |
| `--watch`                               | Automatically restarts the app when file changes are detected.                         |
| `--experimental-transform-types`        | Enables Node to strip TypeScript types and run `.ts` files directly (⚠️ experimental). |
| `--disable-warning=ExperimentalWarning` | Hides warnings related to experimental features.                                       |
| `src/app.ts`                            | Specifies the entry point of your application.                                         |

_Later in the course, when we start working with environment variables and conditional logic (like connecting to a database), we’ll revisit this script and add a few more flags to support real-world needs._

## How to Run TypeScript in Node.js

Before writing any TypeScript code, it's best to initialise a `tsconfig.json` file. This file tells the TypeScript compiler **how** to check and compile your code. Without it, you rely on default settings that may not suit your project.

### `tsconfig.json`

```json
{
  "compilerOptions": {
    /* Base Options: */
    "esModuleInterop": true, // Enables default imports from CommonJS modules
    "lib": ["es2022"], // Includes modern ES features in the type system
    "target": "es2022", // Sets the JavaScript version output
    "skipLibCheck": true, // Skips type checking of declaration files (*.d.ts)
    "allowJs": true, // Allows JavaScript files in the project
    "resolveJsonModule": true, // Allows importing JSON modules
    "moduleDetection": "force", // Treats all files as modules regardless of import/export
    "isolatedModules": true, // Ensures each file can be transpiled independently
    "verbatimModuleSyntax": true, // Keeps import/export syntax as-is for Node.js
    /* Strictness */
    "strict": true, // Enables all strict type-checking options
    "noUncheckedIndexedAccess": true, // Adds 'undefined' to object access via index if type not declared
    "noImplicitOverride": true, // Requires 'override' keyword when overriding methods
    /* Node Options*/
    "allowImportingTsExtensions": true, // Allows importing files with .ts extensions
    "rewriteRelativeImportExtensions": true, // Rewrites relative imports with correct extensions
    "module": "preserve", // Preserves ES module syntax (important for native ESM)
    "noEmit": false, // Enables output generation
    "outDir": "dist", // Output directory for compiled JavaScript
    /* Paths */
    "baseUrl": "./src", // Base path for module resolution
    "paths": {
      "#*": ["*"] // Defines internal path aliases with '#' to avoid conflict with '@'
    }
  },
  "include": ["src"] // Files to include in compilation
}
```

### Why `#` Instead of `@`?

`@` is commonly used by scoped packages in Node.js (e.g. `@types/...`), so to prevent conflicts, we use `#` for our own internal aliases. These work with both `tsconfig.json` and Node’s `imports` field in `package.json`

### Inside the `src/` directory, create a file called `app.ts`

```tsx
const message: string = 'Hello from TypeScript!';
console.log(message);
```

Now that you’ve created your first TypeScript file, let’s see how to run it using the scripts we defined earlier.
You can use the scripts defined in your `package.json`:

```json
"scripts": {
  "dev": "node --watch --experimental-transform-types --disable-warning=ExperimentalWarning src/app.ts",
  "prebuild": "rm -rf dist",
  "build": "tsc",
  "prestart": "npm run build",
  "start": "node dist/app.js"
}
```

### Run your app with: `npm run dev`

```bash
npm run dev
```

This starts your app using the `dev` script, which runs your TypeScript code directly with Node’s experimental transformer.

It **performs type stripping** — meaning it removes all TypeScript-specific types (like `string`, `number`, `interface` etc.) and executes the remaining JavaScript code.

⚠️ This does **not** compile your code or check for type errors. You’ll still benefit from helpful type hints and warnings through your editor (like VSCode), or by running the `tsc` command manually.

To compile your TypeScript files into JavaScript for production:

```bash
npm run build
```

💡 The `build` command automatically checks your code for type errors.

### Before you start committing:

Add `.gitignore`

```bash
node_modules/
dist/
.env
```

## Summary

- Initialise a TypeScript-enabled Node.js project
- Understand and customise your `package.json` scripts
- Use Node’s experimental transformer to run `.ts` files directly
- Create a `tsconfig.json` to control how TypeScript compiles and checks your code
- Compile your project for production using the `tsc` command
