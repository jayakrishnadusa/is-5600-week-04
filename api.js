const path = require('path')
const Products = require('./products')
const fs = require('fs').promises
const autoCatch = require('lib/auto-catch')

/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
 */
function handleRoot (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
}

/**
 * List all products
 * @param {object} req
 * @param {object} res
 */
async function listProducts (req, res) {
  const { offset = 0, limit = 25, tag } = req.query  // Fixed: include 'tag' query parameter

  // Filter products by tag if it exists (optional)
  const products = await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag // Pass the tag for potential filtering if the Products.list supports it
  })

  res.json(products)
}

/**
 * Get a single product
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function getProduct (req, res, next) {
  const { id } = req.params
  const product = await Products.get(id)

  if (!product) {
    return next()  // Pass control to error handling middleware if product is not found
  }

  return res.json(product)
}

/**
 * Create a new product
 * @param {object} req
 * @param {object} res
 */
async function createProduct (req, res) {
  console.log('Request body:', req.body)

  // For now, assuming we’re just echoing the request body back
  // You can implement product creation logic here (e.g., save to database)
  res.json(req.body)
}

// Export the API functions to be used in the app
module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct  // Ensure the 'createProduct' is exported
})
