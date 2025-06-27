import '#db';
import { Product } from '#models';

console.log('📦 All products:\n', await Product.find());

console.log(
  "🧢 Products with 'clothing' tag:\n",
  await Product.find({ tags: 'clothing' })
);

console.log(
  '📈 In-stock products:\n',
  await Product.find({ stock: { $gt: 0 } })
);

console.log(
  '💰 Within price range $10 - $30:\n',
  await Product.find({ price: { $gte: 10, $lte: 30 } })
);

process.exit();
