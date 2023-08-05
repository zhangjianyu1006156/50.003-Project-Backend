const { json } = require("express");
const mongoose = require("mongoose");
// id: details.id,
// placename: details.placename,
// bookingprice: details.bookingprice,
// sourcewebsite: details.sourcewebsite,
// images: details.images,
// rating: details.rating,
// bookingmode: details.bookingmode,
const bookingSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  placename: {
    type: String,
    required: true,
  },
  bookingprice: {
    type: Number,
    required: true,
  },
  sourcewebsite: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  bookingmode: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  data: {
    type: Object,
    default: {},
  },
  name: {
    type: String,
    required: true,
  },
  bookings: [bookingSchema],
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
