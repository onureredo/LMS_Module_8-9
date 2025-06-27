import '#db';
import { Product } from '#models';

await Product.updateOne({ name: 'T-Shirt' }, { $set: { stock: 45 } });
console.log('🔄 T-Shirt stock updated');

await Product.updateMany({ tags: 'clothing' }, { $addToSet: { tags: 'sale' } });
console.log('🏷️  Added "sale" tag to all clothing items');

process.exit();
