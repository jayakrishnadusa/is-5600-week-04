const fs = require('fs').promises
const path = require('path')
const express = require('express')
const api = require('./api')
// app.js
// Require the middleware module
const middleware = require('middleware')
const bodyParser = require('body-parser')

// Register our upcoming middleware
app.use(middleware.cors)
app.use(bodyParser.json())
app.get('/', api.handleRoot)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
// Set the port
const port = process.env.PORT || 3000
// Boot the app
const app = express()
// Register the public directory
app.use(express.static(__dirname + '/public'));
// register the routes
app.get('/', api.handleRoot)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`))
app.post('/products', api.createProduct)
/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
*/
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

/**
 * List all products
 * @param {object} req
 * @param {object} res
 */
async function listProducts(req, res) {
  const productsFile = path.join(__dirname, 'data/full-products.json')
  try {
    const data = await fs.readFile(productsFile)
    res.json(JSON.parse(data))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}