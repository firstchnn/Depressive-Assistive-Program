const express = require('express');
const app = express();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const url = 'mongodb+srv://chnw-admin:5wtxlgWw6E0s8l8g@application.boctkj3.mongodb.net/test';
const dbName = 'doctorDB';
const collectionName = 'doctors';

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.log('Error connecting to MongoDB:', err);
    return;
  }

  const db = client.db(dbName);
  console.log('Connected to MongoDB');

  // Create an API endpoint that returns data from the collection
  app.get('/api/data', (req, res) => {
    db.collection(collectionName).find({}).toArray((err, docs) => {
      if (err) {
        console.log('Error getting data from collection:', err);
        res.sendStatus(500);
        return;
      }

      res.json(docs);
    });
  });
});