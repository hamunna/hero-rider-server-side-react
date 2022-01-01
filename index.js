const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5000;



app.get('/', (req, res) => {
	res.send('Hero-Rider Server is running...');
});

app.listen(port, () => {
	console.log('Server is running on port: ', port)
});