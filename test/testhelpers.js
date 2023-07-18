const {MongoClient} = require('mongodb');

const mongoURI = "mongodb+srv://test:nBQQiZcHeYW1S215@projecttest.dqvhrv1.mongodb.net/?retryWrites=true&w=majority"
const mongoDBName = "testdb"

module.exports = {
    mongoURI,
    mongoDBName
}