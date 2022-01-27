const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productSchema = new Schema({
    productName: {
		type: String,
		required: [true, "Product name is required"]
    },
    description: {
		type: String,
		required: [true, "Description is required"]
	},
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    currency:{
      type: String,
      required: [true, 'Currency is required.']
    },
    isActive: {
		type: Boolean,
		default: true
	},
    createdOn:{
        type: Date,
		default: new Date()
    }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product