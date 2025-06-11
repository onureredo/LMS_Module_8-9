import { Command } from 'commander';
import '@/db';
import {
  addProduct,
  listProducts,
  updateProduct,
  deleteProduct,
} from '@/controllers/product.controller';

// Initialize commander CLI program
const program = new Command();
program
  .name('mongoose-crud-cli')
  .version('1.0.0')
  .description('Product management CLI');

// Define each CLI command and its arguments
program
  .command('add')
  .argument('<name>', 'Product name')
  .argument('<stock>', 'Stock quantity')
  .argument('<price>', 'Price')
  .action((name, stockStr, priceStr) => {
    addProduct(name, parseInt(stockStr), parseFloat(priceStr));
  });

program.command('list').action(() => listProducts());

program
  .command('update')
  .argument('<name>', 'Product name')
  .argument('<stock>', 'New stock')
  .argument('<price>', 'New price')
  .action((name, stockStr, priceStr) => {
    updateProduct(name, parseInt(stockStr), parseFloat(priceStr));
  });

program
  .command('delete')
  .argument('<name>', 'Product name')
  .action((name) => deleteProduct(name));

// Start parsing CLI input
program.parse();
