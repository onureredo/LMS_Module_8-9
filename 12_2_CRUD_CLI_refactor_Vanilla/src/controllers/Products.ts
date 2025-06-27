import { Product } from '#models';

// CREATE
export const addProduct = async (
  name: string,
  stock: number,
  price: number
) => {
  await Product.create({ name, stock, price });
  console.log(`✅ Added: ${name} (${stock} pcs at $${price})`);
};

// READ
export const listProducts = async () => {
  const products = await Product.find();
  console.log('📦 Products:');
  products.forEach((p, i) =>
    console.log(`${i + 1}. ${p.name} — ${p.stock} pcs — $${p.price}`)
  );
};

// UPDATE
export const updateProduct = async (
  name: string,
  newName: string,
  stock: number,
  price: number
) => {
  const result = await Product.findOneAndUpdate(
    { name },
    { name: newName, stock, price, updatedAt: new Date() },
    { new: true }
  );
  if (result) {
    console.log(
      `🔁 Updated: "${name}" to "${newName}" | ${stock} pcs at $${price}`
    );
  } else {
    console.log('⚠️ Product not found.');
  }
};

// DELETE
export const deleteProduct = async (name: string) => {
  const result = await Product.findOneAndDelete({ name });
  if (result) {
    console.log(`🗑️ Deleted: ${name}`);
  } else {
    console.log('⚠️ Product not found.');
  }
};
