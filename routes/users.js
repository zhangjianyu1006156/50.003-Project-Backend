const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { run } = require("../database");

const router = express.Router();
const UserModel = require("../models/user");
router.use(cors());

//creating a new user document on login with google account
router.post("/profile", (req, res) => {
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

// Book a Product
router.post("/", async (req, res) => {
  const { user_id, name, bookings } = req.body;
  const booking = {
    name: bookings[0].name,
    price_paid: bookings[0].price_paid,
    savings: bookings[0].savings,
  };

  try {
    // Find the user with the given user_id
    const user = await UserModel.findOne({ user_id });
    // if (!user) {
    //   // If the user does not exist, create a new user with the given user_id and name
    //   const newUser = new UserModel({
    //     user_id,
    //     name,
    //     bookings: [booking]
    //   });

    //   // Save the new user document
    //   const savedUser = await newUser.save();

    //   // Return the new user as the response
    //   res.status(201).json(savedUser);
    // } else {
    // Add the new booking to the existing user's bookings array
    user.bookings.push(booking);

    // Save the updated user document
    const updatedUser = await user.save();

    // Return the updated user as the response
    res.status(201).json(updatedUser);
    // }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get User Bookings
router.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    // Find the user with the given user_id
    const user = await UserModel.findOne({ user_id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the list of bookings for the user as the response
    res.json(user.bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
