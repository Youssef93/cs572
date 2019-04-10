const express = require("express");
const cors = require("cors");
const mongo = require('mongodb');

const { MongoClient } = mongo;
let collection;

const CURRENT_LAT = 41.017654;
const CURRENT_LONG = -91.9665342;

const connectToMongo = async function() {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    const db = client.db('fairfield');
    collection = db.collection('places');
}

connectToMongo();

const app = express();
app.use(cors());

// fails if json is invalid
app.use(express.json());

app.post("/places", async (req, res) => {
  const newItem = await collection.insert(req.body);
  res.send(newItem);
});

app.get('/search', async(req, res) => {
    const { name, category } = req.query;

    const query = {
        location: {
            $near: [ CURRENT_LONG, CURRENT_LAT ]
        }
    };

    if(!category) return res.status(400).send('Category is required in query');
    query.category = category;

    if(name) query.name = name;

    const result = await collection.find(query).limit(3).toArray();

    res.json(result);
});


app.listen(3000);