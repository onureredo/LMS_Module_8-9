import '#db';
import { Product } from '#models';

// Delete specific product by name
await Product.deleteOne({ name: 'Cap' });
console.log('🗑️  Deleted product: Cap');

// Delete all out-of-stock products
await Product.deleteMany({ stock: { $lte: 0 } });
console.log('🧹 Deleted all out-of-stock products');

// Optionally, delete all products
// await Product.deleteMany({});
// console.log('🧹 All products deleted');

process.exit();
