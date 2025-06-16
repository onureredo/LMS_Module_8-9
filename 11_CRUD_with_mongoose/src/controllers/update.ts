import '@/db';
import { Product } from '@/models/product.model';

await Product.updateOne({ name: 'T-Shirt' }, { $set: { stock: 0 } });
console.log('🔄 T-Shirt Stock updated');

await Product.updateMany({ tags: 'clothing' }, { $addToSet: { tags: 'sale' } });
console.log('🏷️ Added "sale" tag to all clothing items');

process.exit();
