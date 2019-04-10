const mongo = require('mongodb');

const { MongoClient } = mongo;
let collection;

const connect = async function() {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    const db = client.db('places');
    collection = db.collection('restaurants');
};

let result;

const queries = async function() {
    //1
    result = await collection.find({}).toArray();

    //2
    result = await collection.find({}).project({restaurant_id: 1, name: 1, district: 1, cuisine: 1}).toArray();

    //3
    result = await collection.find({}).project({restaurant_id: 1, name: 1, district: 1, cuisine: 1, _id: 0}).toArray();

    //4
    result = await collection.find({}).project({restaurant_id: 1, name: 1, district: 1, cuisine: 1, _id: 0, "address.zipcode": 1}).toArray();

    //5
    result = await collection.find({ district: 'Bronx'}).toArray();

    //6
    result = await collection.find({ district: 'Bronx'}).limit(5).toArray();

    //7
    result = await collection.find({ district: 'Bronx'}).skip(5).limit(5).toArray();

    //8
    result = await collection.find({"address.coord": { $lte: -95.754168}}).toArray();

    //9
    result = await collection.find({"address.coord": { $lte: -65.754168}, cuisine: {$ne: 'American'}, grades: { $elemMatch: {
        score: { $gte: 70}
    }} }).toArray();

    //10
    result = await collection.find({ name: { $regex: '^Wil'}}).project({restaurant_id: 1, name: 1, district: 1, cuisine: 1}).toArray()

    //11
    result = await collection.find({ name: { $regex: 'ces$'}}).project({restaurant_id: 1, name: 1, district: 1, cuisine: 1}).toArray()

    //12
    result = await collection.find({ name: { $regex: '.*Reg.*'}}).project({restaurant_id: 1, name: 1, district: 1, cuisine: 1}).toArray()

    //13
    result = await collection.find({district: 'Bronx', cuisine: { $in: ['American', 'Chinese']}}).toArray()

    //14
    result = await collection.find({district: {$in: ['Staten Island', 'Queens', 'Bronx', 'Brooklyn']}}).project({restaurant_id: 1, name: 1, district: 1, cuisine: 1}).toArray()

    //15
    result = await collection.find({district: {$nin: ['Staten Island', 'Queens', 'Bronx', 'Brooklyn']}}).project({restaurant_id: 1, name: 1, district: 1, cuisine: 1}).toArray()

    //16
    result = await collection.find({}, { arrayFilters: {'grades.$.score': { $lte: 10 }}}).toArray();

    //17
    result = await collection.find({'address.coord.1': {$gte: 42, $lte: 52}}).project({restaurant_id: 1, name: 1, district: 1, cuisine: 1, 'address.coord': 1}).toArray();

    //18
    result = await collection.find({}).sort({ name: 1 }).toArray();

    //19
    result = await collection.find({}).sort({ name: -1 }).toArray();
    
    //20
    result = await collection.find({}).sort({ cuisine: 1, name: -1 }).toArray();

    //21
    result = await collection.find({ 'address.street': {$exists: false }}).count() !== 0;

    //22
    result = await collection.find({ 'address.coor': {$type: 1}}).toArray();

    //23
    result = await collection.find({ name: { $regex: '^Mad'}}).project({ name: 1, district: 1, 'address.coord': 1}).toArray()
}

connect().then(queries).catch(console.log);