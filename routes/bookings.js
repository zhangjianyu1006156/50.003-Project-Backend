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

module.exports = router;