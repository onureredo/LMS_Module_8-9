import '#db';
import { Product } from '#models';

await Product.create({
  name: 'T-Shirt',
  price: 19.99,
  stock: 50,
  tags: ['clothing', 'unisex'],
});

await Product.insertMany([
  { name: 'Hoodie', price: 34.99, stock: 30, tags: ['clothing', 'winter'] },
  { name: 'Sneakers', price: 59.99, stock: 20, tags: ['shoes', 'sport'] },
  { name: 'Cap', price: 14.99, stock: 100, tags: ['accessory', 'summer'] },
]);

console.log('✅ added Products into Database');
process.exit();
