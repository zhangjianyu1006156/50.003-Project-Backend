const express = require('express');
const router = express.Router();
const ProductModel = require('../models/product');

// Getting all products' names and prices
router.get('/', async (req, res) => {
    try {
      const products = await ProductModel.find({});
      res.json(products);
      console.log("/ endpoint is running")
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// Getting information about a specific product
router.get('/:product_id', getProduct, (req, res) => {
  res.json(res.product);
});

// Create a Product
router.post('/', async (req, res) => {
    const product = new ProductModel({
        product_id: req.body.product_id,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        klook_price: req.body.klook_price,
        tripcom_price: req.body.tripcom_price
    })
    try {
        const newProduct = await product.save()
        res.status(201).json(newProduct) 
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

// Update Product
router.patch('/:product_id', getProduct, async (req, res) => {
    // Implement update logic here based on req.body
  });

// Delete Product
router.delete('/:product_id', getProduct, async (req, res) => {
    try {
      await ProductModel.findByIdAndRemove(req.params.product_id);
      res.json({ message: 'Deleted Product' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

async function getProduct(req, res, next) {
  let product;
  try {
      product = await ProductModel.findById(req.params.product_id);
      if (product == null) {
          return res.status(404).json({ message: 'Cannot find product' });
      }
  } catch (err) {
      return res.status(500).json({ message: err.message });
  }
  res.product = product;
  next();
}

module.exports = router;