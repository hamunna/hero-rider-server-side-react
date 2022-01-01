const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xribv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
	try {
		await client.connect();
		const database = client.db('heroRider');
		const usersCollection = database.collection('users');

		//==========================================================================
		// GET API
		//==========================================================================

		// GET Users
		app.get('/users', async (req, res) => {
			const cursor = usersCollection.find({});
			const users = await cursor.toArray();

			const search = req.query.search;

			if (search) {
				const searchResult = users.filter(user => user?.name.toLocaleLowerCase().includes(search) || user?.email.toLocaleLowerCase().includes(search) || user?.phone.toLocaleLowerCase().includes(search));
				console.log(searchResult);
				res.send(searchResult);
			} else {
				
				res.json(users);
			}
		});

		//==========================================================================
		// POST API
		//==========================================================================

		// POST Users Data
		app.post('/users', async (req, res) => {
			const newUser = req.body;
			const result = await usersCollection.insertOne(newUser);
			res.json(result);
		});

		
	} finally {
		// Ensures that the client will close when you finish/error
		// await client.close();
	}
}
run().catch(console.dir);

app.get('/', (req, res) => {
	res.send('Hero-Rider Server is running...');
});

app.listen(port, () => {
	console.log('Hero-Rider Server is running on port: ', port)
});