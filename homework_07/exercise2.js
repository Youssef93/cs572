const mongo = require('mongodb');
const encryptor = require('simple-encryptor');

const { MongoClient } = mongo;
let collection;

const getMsg = async function() {
    const client = new MongoClient('mongodb://homework01:homework01@ds233806.mlab.com:33806/homework01');
    await client.connect();
    const db = client.db('homework01');
    collection = db.collection('data');

    const result = await collection.findOne({}, { key: 1, message: 1, _id: 0});
    const decrypt = encryptor(result.key);
    return decrypt.decrypt(result.message);
};

getMsg().catch(console.log).then(console.log);