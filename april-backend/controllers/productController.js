const Product = require('../models/Product');

module.exports.addNewProduct = (reqBody) => {

	let newProduct = {
		productName: reqBody.productName,
        description: reqBody.description,
        price: reqBody.price,
		currency: reqBody.currency
	}
	return Product.create(newProduct).then( (result, error) => {
		if(result){
			return true
		} else {
			return error
		}
	})
}

module.exports.getAllProducts = (name) => {

	return Product.find({productName:{"$regex":name,"$options":"i"}}).then( (result, error) => {
		if(error){
			return false
		} else {
			return result
		}
	})
}

module.exports.getSingleProduct = (id) => {
	return Product.findOne({_id: id}).then( (result, error) => {

		if(result == null){
			return `Product not existing`

		} else {
			if(result){
				return result
			} else {
				return error
			}
		}
	})
}


module.exports.getActiveProducts = () => {
	return Product.find({isActive: true}).then((result, err) => {
		if(err) {
			return false
		} else {
			return result
		}
	})
}


module.exports.editProduct = (id, reqBody) => {
	const {productName, description, price, currency} = reqBody

	let updatedProduct = {
		productName: productName,
		description: description,
		price: price,
		currency: currency
	}

	return Product.findByIdAndUpdate(id, updatedProduct, {new: true}).then( (result, error) => {

			if(error){
				return error
			} else {
				return result
			}
	})
}

module.exports.archiveProductById = (id) => {

	return Product.findByIdAndUpdate({_id: id}, {isActive: false}).then( (result, error) => {

		if(result == null){
			return `Product not existing`
		} else {
			if(result){
				return true
			} else {
				return false
			}
		}
	})
}

module.exports.unarchiveProductById = (id) => {

	return Product.findByIdAndUpdate({_id: id}, {isActive: true}).then( (result, error) => {

		if(result == null){
			return `Product not existing`
		} else {
			if(result){
				return true
			} else {
				return false
			}
		}
	})
}