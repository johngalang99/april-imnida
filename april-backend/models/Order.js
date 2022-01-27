const mongoose = require('mongoose');
const Schema = mongoose.Schema

const orderSchema = new Schema({
 userId: {
        type: String,
        required: [true, "Required"]
 },
 items: [
    {
        productId: {
            type: String
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity cannot be less than 1"]
        },
        price: Number
    }
    ],
 totalAmount: {
    type: Number,
    required: true
 },
 purchaseOn: {
     type: Date,
     default: new Date()
 }

})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order
