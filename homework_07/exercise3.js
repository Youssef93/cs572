const express = require("express");
const cors = require("cors");
const mongo = require("mongodb");

const { MongoClient } = mongo;
let collection;

const connectToMongo = async function() {
  const client = new MongoClient("mongodb://localhost:27017");
  await client.connect();
  const db = client.db("test");
  collection = db.collection("lectures");
};

connectToMongo();

const app = express();
app.use(cors());

// fails if json is invalid
app.use(express.json());

app.get("/lectures", async (req, res) => {
  try {
    const cursor = await collection.find({});
    const data = await cursor.toArray();
    res.send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send('error occurred');
  }
});

app.get("/lectures/:id", async (req, res) => {
  try {
    const lecture = await collection.findOne({ _id: mongo.ObjectID(req.params.id) });
    res.send(lecture);
  } catch (e) {
    console.log(e);
    res.status(500).send('error occurred');
  }
});

app.post("/lectures", async (req, res) => {
  try {
    const newItem = await collection.insert(req.body);
    res.send(newItem);
  } catch(e) {
    console.log(e);
    res.status(500).send('error occurred');
  }
});

app.delete("/lectures/:id", async (req, res) => {
  try {
    await collection.deleteOne({ _id: mongo.ObjectID(req.params.id) });
    res.send(true);
  } catch (e) {
    console.log(e);
    res.status(500).send('error occurred');
  }
});

app.put("/lectures/:id", async (req, res) => {
  try {
    const updatedItem = await collection.updateOne({ _id: mongo.ObjectID(req.params.id) }, { $set: req.body });
    res.send(updatedItem);
  } catch (e) {
    console.log(e);
    res.status(500).send('error occurred');
  }
});

app.post("/search", async (req, res) => {
  try {
    const searchResultCursor = await collection.find({ name: { $regex: req.query.q } });
    const searchResult = await searchResultCursor.toArray();
    res.send(searchResult);
  } catch (e) {
    console.log(e);
    res.status(500).send('error occurred');
  }
});

app.listen(3000);
