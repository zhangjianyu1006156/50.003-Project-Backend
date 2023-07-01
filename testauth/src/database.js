const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://test:nBQQiZcHeYW1S215@projecttest.dqvhrv1.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

//makes 16 char user ID
makeId = () => {
    let ID = "";
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for ( var i = 0; i < 16; i++ ) {
      ID += characters.charAt(Math.floor(Math.random() * 36));
    }
    return ID;
}

//this makes example document, hook it up with signup button
async function run() {
  try {
    const database = client.db('testdb'); //replace this with db name
    const user = database.collection('User');

    const userdata = { id: makeId(), name: "test2item", bookings:[] }
    user.insertOne( userdata );

    console.log("userdata added:", userdata);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);