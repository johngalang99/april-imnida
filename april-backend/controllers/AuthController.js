const User = require('../models/User');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../auth');

module.exports.register = (reqBody) => {

	let password = bcrypt.hashSync(reqBody.password, bcrypt.genSaltSync(10));

	let newUser = new User({
		firstName: reqBody.firstName,
		lastName: reqBody.lastName,
		email: reqBody.email,
		password
	})

	return newUser.save().then( (result, error) => {
		if(result){
			return true
		} else {
			return error
		}
	})
}

module.exports.login = (reqBody) => {
	const {email, password} = reqBody;

	return User.findOne({email: email}).then( (result, error) => {

		if(result == null){
			return false
		} else {
			let isPasswordCorrect = bcrypt.compareSync(password, result.password)

			if(isPasswordCorrect == true){
				return {access: auth.createAccessToken(result)}
			} else {
				return false
			}
		}
	})
}

module.exports.userUpdate = (id,reqBody)=>{

    const {firstName, lastName, email, password, isAdmin} = reqBody
	let passwordhash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    
    let updateData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: passwordhash,
		isAdmin

    }

    return User.findByIdAndUpdate(id, updateData, {new: true}).then( (result, error) => {

        if(error){
            return error
        } else {
            return result
        }
})
}
