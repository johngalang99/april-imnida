const User = require('../models/User')

module.exports.checkEmail = (reqBody) => {
	const {email} = reqBody 

	return User.findOne({email: email}).then( (result, error) => {
		if(result != null){
			return `Email already exists`
		} else {
			console.log(result)	
			if(result == null){
				return true
			} else {
				return error 
			}
		}
	})
}

/*module.exports.store = (reqBody) => {

	let newUser = new User({
		firstName: reqBody.firstName,
		lastName: reqBody.lastName,
		email: reqBody.email,
		password: reqBody.password
	})
	return newUser.save().then( (result, error) => {
		if(result){
			return true
		} else {
			return error
		}
	})
}*/


module.exports = {
	getAllUsers: async() => {
		return await User.find()
	}
}

 