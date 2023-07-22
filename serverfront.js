const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { run } = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

//this must run before mongod account creation
//creating a get route
// app.get("/message", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });
app.get("/message", (req, res) => {
  res.json({ message: "Hello from Sever, It's me" });
});
//handling post route
//need to figure out how to get data from react page
app.post("/profile", (req, res) => {
  const reqData = req.body.key;
  //this calls the google oauth to retrieve profile information
  axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${reqData.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${reqData.access_token}`,
          Accept: "application/json",
        },
      }
    )
    .then((profile) => {
      console.log(profile.data.name);
      run("User", profile.data);
      res.json({ message: profile.data.name });
    })
    .catch((err) => {
      console.log(err);
    });
});
//this start the express.js listening on port 8000
app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
