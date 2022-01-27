const jwt = require("jsonwebtoken")
const secret = "BookingAPI";

module.exports.createAccessToken = (user) => {
	const data = {
		id: user._id, 
		email: user.email,
		isAdmin: user.isAdmin
	}

	return jwt.sign(data, secret, {});
}



module.exports.verify = (req, res, next) => {

	if(!req.headers.authorization) return res.status(403)

	let token = req.headers.authorization

	if(typeof token !== "undefined"){

		return jwt.verify(token.split('')[1], secret, (err, data) => {
			if(err){
				return res.status(403).send( {auth: "failed"} )
			} else {
				next()
			}
		})
	}
}


module.exports.decode = (token) => {

	if(typeof token != "undefined"){
		token = token.slice(7, token.length)

		return jwt.verify(token, secret, (err, data) => {
			if(err){
				return null
			} else {
				return jwt.decode(token, {complete: true}).payload
			}
		})
	}
}

module.exports = {
	createAccessToken: user => {
		const data = {
			id: user._id, 
			email: user.email,
			isAdmin: user.isAdmin
		}
	
		return jwt.sign(data, secret, {});
	},
	decode: (token) => {

	},
	verify: (req, res, next) => {

		if(!req.headers.authorization) res.status(403).json({message: "forbidden"})
	
		let token = req.headers.authorization
	
		if(typeof token !== "undefined"){
	
			return jwt.verify(token.split(' ')[1], secret, (err, data) => {
				if(err){
					console.log(err)
					res.status(403).send( {auth: "failed"} )
				} else {
					req.user = data
					next()
				}
			})
		}else{
			res.status(403).json({message: "forbidden"})
		}
	},
	forAdmin: (req, res, next) => {
		try {
			if(!req.headers.authorization) return res.status(403)

			let token = req.headers.authorization
			
			let decodedJWT = jwt.decode(token.split(' ')[1])

			if(decodedJWT.isAdmin)
				next()
			else 
				return res.status(403)
			
		} catch(err) {
			return res.status(403)
		}
	}
}