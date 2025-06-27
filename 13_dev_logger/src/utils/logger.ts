export const logger = (msg: string) => {
  const timestamp = new Date().toLocaleString();
  console.log(`[${timestamp}] ${msg}`);
};
