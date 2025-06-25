import { Command } from 'commander';
import { db } from '#db';

// Initialize the CLI program
const program = new Command();
program
  .name('ecommerce-cli')
  .description('Simple product CRUD CLI')
  .version('1.0.0');

// CREATE — Add a new product
program
  .command('add')
  .description('Add a new product')
  .argument('<name>', 'Product name')
  .argument('<stock>', 'Stock quantity')
  .argument('<price>', 'Product price')
  .action(async (name, stockStr, priceStr) => {
    const stock = parseInt(stockStr);
    const price = parseFloat(priceStr);

    // Insert the new product into the database
    await db.collection('products').insertOne({
      name,
      stock,
      price,
      created_at: new Date(),
    });

    console.log(`✅ Added: ${name} (${stock} pcs at $${price})`);
  });

// READ — List all products
program
  .command('list')
  .description('List all products')
  .action(async () => {
    const products = await db.collection('products').find().toArray();

    console.log('📦 Products:');
    products.forEach((p, i) =>
      console.log(`${i + 1}. ${p.name} — ${p.stock} pcs — $${p.price}`)
    );
  });

// UPDATE — Update an existing product
program
  .command('update')
  .description('Update product by name')
  .argument('<oldName>', 'Current product name')
  .argument('<newName>', 'New product name')
  .argument('<stock>', 'New stock quantity')
  .argument('<price>', 'New product price')
  .action(async (oldName, newName, stockStr, priceStr) => {
    const stock = parseInt(stockStr);
    const price = parseFloat(priceStr);

    const result = await db.collection('products').updateOne(
      { name: oldName },
      {
        $set: {
          name: newName,
          stock,
          price,
          updated_at: new Date(),
        },
      }
    );

    if (result.matchedCount) {
      console.log(
        `🔁 Updated: ${oldName} => ${newName} (${stock} pcs at $${price})`
      );
    } else {
      console.log('⚠️  Product not found.');
    }
  });

// DELETE — Remove a product
program
  .command('delete')
  .description('Delete product by name')
  .argument('<name>', 'Product name')
  .action(async (name) => {
    const result = await db.collection('products').deleteOne({ name });

    if (result.deletedCount) {
      console.log(`🗑️  Deleted: ${name}`);
    } else {
      console.log('⚠️  Product not found.');
    }
  });

// Parse CLI arguments
program.parse();
