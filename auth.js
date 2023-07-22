const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { run } = require("./database");

const auth = express.Router();
app.use(cors());
app.use(express.json());

//creating new user documents when users log in with their google accounts
auth.post("/profile", (req, res) => {
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

module.exports = auth;
// //this start the express.js listening on port 8000
app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
