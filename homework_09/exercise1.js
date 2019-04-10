const mongo = require('mongodb');

const { MongoClient } = mongo;

const queries = async function () {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    const db = client.db('places');
    const collection = db.collection('zipcodes');

    let result;

    //1
    result = await collection.aggregate([
        {
            $match: { 'state': 'WA' }
        },
        {
            $project: { _id: 1 }
        }
    ]).toArray();

    //2
    result = await collection.aggregate([
        {
            $match: { 'pop': { $lte: 5000 } }
        },
        {
            $project: { _id: 1 }
        }
    ]).toArray();

    //3
    result = await collection.aggregate([
        {
            $group: {
                _id: { city: "$city", state: "$state"},
                count: { $sum: 1}
            }
        },
        {
            $match: { count: { $gt: 1} }
        },
        {
            $sort: { "_id.state": 1, "_id.city": 1}
        },
        {
            $project: { count: 0 }
        }
    ]).toArray();

    //4
    result = await collection.aggregate([
        {
            $group: {
                _id: { city: "$city", state: "$state"},
                population: { $sum: '$pop' }
            }
        },
        {
            $sort: { pop: 1 }
        },
        {
            $group: { _id: "$_id.state", city: { $first: "$_id.city"}, population: { $first: "$population"}}
        }, 
        {
            $sort: { _id: 1 }
        }
    ]).toArray();

    return result;
};

queries().then(console.log).catch(console.log);
