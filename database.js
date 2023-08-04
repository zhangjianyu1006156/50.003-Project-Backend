// const axios = require("axios");
// const express = require("express");
// const cors = require("cors");
const { User } = require("./models/user");
// const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
// const uri = process.env.DATABASE_URL;

// const client = new MongoClient(uri);
// const app = express.Router();
// app.use(cors());

//makes 16 char user ID
const makeId = () => {
  let ID = "";
  let characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (var i = 0; i < 16; i++) {
    ID += characters.charAt(Math.floor(Math.random() * 36));
  }
  return ID;
};

//this makes example document, hook it up with signup button
async function run(data) {
  const use_id = makeId();
  // try {
  // const database = client.db("test"); //replace this with db name
  // const user = database.collection(collectionname);

  // this also needs a push request to send the token key to this express.js
  // this needs to be have an axios function to get back the profile data
  const userdata = new User({
    user_id: use_id,
    data: data,
    name: "test2item",
  });
  await userdata
    .save()
    .then((savedUser) => {
      console.log("userdata added:", savedUser);
    })
    .catch((err) => {
      console.log("Error saving user data:", err);
    });
  // user.insertOne(userdata);

  console.log("userdata added:", userdata);
  // axios
  //   .post("/profile ", { key: userdata.id })
  //   .then((res) => {
  //     console.log("id sent to frontend");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // } finally {
  //   // Ensuers that the client will close when you finish/error
  //   client.close();
  // }
  return use_id;
}
module.exports = { run };
//run().catch(console.dir);
