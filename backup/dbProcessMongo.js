

const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
const client = new MongoClient(uri);

//insert function
async function insert(dbname, collectionName, query) {
    try {
        await client.connect();
        const database = client.db(dbname);
        const collection = database.collection(collectionName);
        const response = await collection.insertOne(query);
        console.log(response);
    } finally {
        await client.close();
    }
}
//find function
async function find(dbname, collectionName, query) {
    try {
        await client.connect();
        const database = client.db(dbname);
        const collection = database.collection(collectionName);
        const response = await collection.findOne(query);
        return response;
    } finally {
        await client.close();
    }
}

module.exports = {
    insert,
    find
};