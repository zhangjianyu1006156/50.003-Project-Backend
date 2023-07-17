const express = require('express');
const router = express.Router();
const BookingModel = require('../models/booking');

// Book a Product
router.post('/', async (req, res) => {
    const booking = new BookingModel({
        product_name: req.body.product_name,
        user_id: req.body.user_id,
        price_paid: req.body.price_paid,
        savings_obtained: req.body.savings_obtained
    })
    try {
        const newBooking = await booking.save()
        res.status(201).json(newBooking) 
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

// Get User Bookings
router.get('/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    try {
      // Find all bookings for the given user_id
      const bookings = await BookingModel.find({ user_id });
  
      if (bookings.length === 0) {
        // No bookings found for the user_id
        return res.status(404).json({ message: 'No bookings found for this user' });
      }
  
      // Return the list of bookings as the response
      res.json(bookings);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

module.exports = router;