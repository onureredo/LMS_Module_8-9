import '#db';
import { Command } from 'commander';
import {
  addProduct,
  listProducts,
  updateProduct,
  deleteProduct,
} from '#controllers';

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
  .argument('<name>', 'Current product name')
  .argument('<newName>', 'New product name')
  .argument('<stock>', 'New stock')
  .argument('<price>', 'New price')
  .action((name, newName, stockStr, priceStr) => {
    updateProduct(name, newName, parseInt(stockStr), parseFloat(priceStr));
  });

program
  .command('delete')
  .argument('<name>', 'Product name')
  .action((name) => deleteProduct(name));

// Parsing CLI input
program.parse();
