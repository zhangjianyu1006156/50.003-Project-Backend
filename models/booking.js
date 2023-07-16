const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    price_paid: {
        type: Number,
        required: true
    },
    savings_obtained: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Booking', bookingSchema)