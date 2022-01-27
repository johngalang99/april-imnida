const Order = require('../models/Order');
const ProductModel = require('../models/Product')

module.exports.checkout = async (request, user) => {
    try{
        let { checkout} = request
        let items =[]
        let totalAmount = 0

        for(let order of checkout){
            let {productId, qty} = order
            let productDetails = await ProductModel.findById(productId)
            totalAmount = totalAmount + (qty + productDetails.price)
            items.push({productId, name: productDetails.productName, quantity:qty})

        }
        let orderResult = await Order.create({
            totalAmount,
            purchaseOn: new Date(),
            userId: user.id,
            items
        })
        return orderResult
    } catch (err){
        throw err
    }
}