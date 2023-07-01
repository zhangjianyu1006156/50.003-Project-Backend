const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://root:password@172.17.0.1:27017/admin';
const dbName = 'tbap';
let db;

MongoClient.connect(url, function (err, client) {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected successfully to server');
  db = client.db(dbName);
});

app.get('/product/:product_id', (req, res) => {
  const productId = req.params.product_id;

  try {
    db.collection('products').findOne({ _id: ObjectId(productId) }, function (err, result) {
      if (err) {
        console.error('Error retrieving product:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (!result) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      res.send(result);
    });
  } catch (err) {
    console.error('Error retrieving product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/products', (req, res) => {
  try {
    db.collection('products').find({}, { projection: { name: 1, price: 1 } }).toArray(function (err, result) {
      if (err) {
        console.error('Error retrieving products:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      res.send(result);
    });
  } catch (err) {
    console.error('Error retrieving products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(3000, function () {
  console.log('Listening on port 3000');
});
