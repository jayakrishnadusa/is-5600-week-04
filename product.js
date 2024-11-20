// products.js
const fs = require('fs').promises
const path = require('path')

const productsFile = path.join(__dirname, 'data/full-products.json')

module.exports = {
  list,
  get
}

/**
 * List all products
 * @param {object} options - Options for pagination (offset and limit)
 * @returns {Promise<Array>} - A list of products
 */
async function list(options = {}) {
  const { offset = 0, limit = 25 } = options

  try {
    const data = await fs.readFile(productsFile, 'utf-8')  // Specify encoding to return string
    const products = JSON.parse(data)  // Parse JSON data
    return products.slice(offset, offset + limit)  // Return paginated products
  } catch (error) {
    console.error("Error reading products file:", error)
    throw new Error('Unable to load products data.')
  }
}

/**
 * Get a single product by its ID
 * @param {string|number} id - The ID of the product
 * @returns {Promise<Object|null>} - The product object or null if not found
 */
async function get(id) {
  try {
    const data = await fs.readFile(productsFile, 'utf-8')  // Specify encoding to return string
    const products = JSON.parse(data)  // Parse JSON data

    // Use find method to locate the product with the matching ID
    const product = products.find(p => p.id === id)

    return product || null  // Return the product or null if not found
  } catch (error) {
    console.error("Error reading products file:", error)
    throw new Error('Unable to load product data.')
  }
}
