import '#db';
import { Product } from '#models';

await Product.updateOne({ name: 'T-Shirt' }, { $set: { stock: 45 } });
console.log('🔄 T-Shirt stock updated');

await Product.updateMany({ tags: 'clothing' }, { $addToSet: { tags: 'sale' } });
console.log('🏷️  Added "sale" tag to all clothing items');

process.exit();

//   "scripts": {
//   "query": "node --experimental-transform-types --disable-warning=ExperimentalWarning --env-file=.env",
//   "create": "npm run query src/controllers/create.ts",
//   "read": "node src/controllers/read.ts",
//   "update": "node src/controllers/update.ts",
//   "delete": "node src/controllers/delete.ts"
// },
