const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
		type: String,
		required: [true, "First Name is required"]
	},
	lastName: {
		type: String,
		required: [true, "Last Name is required"]
	},
	
	email: {
		type: String,
		required: [true, "Email is required"]
    },
    password: {
		type: String,
		required: [true, "Password is required"]
	},
    isAdmin: {
		type: Boolean,
		default: false
	}
})

const User = mongoose.model('User', userSchema)
module.exports = User