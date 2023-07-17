const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price_paid: {
    type: Number,
    required: true
  },
  savings: {
    type: Number,
    required: true
  }
});

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  bookings: [bookingSchema]
});

module.exports = mongoose.model('User', userSchema);
