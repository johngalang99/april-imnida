const express = require('express')
const router = express.Router()
const { forAdmin } = require('../auth')

const productController = require('../controllers/productController')

router.post('/product', forAdmin, (req,res)=>{
	productController.addNewProduct(req.body).then(result=>res.send(result))
})

router.get("/product", forAdmin, (req, res) => {
	let { name } = req.query
	productController.getAllProducts(name).then(result => res.send(result))
})

router.get("/product/:id", forAdmin, (req, res) => {
	let { id } = req.params

	productController.getSingleProduct(id).then( result => res.send(result))
})

router.get("/active/product", forAdmin, (req, res) => {
	productController.getActiveProducts().then(result => res.send(result))
})

router.put("/:productId/product",  forAdmin,(req, res) => {

	productController.editProduct(req.params.productId, req.body).then( result => res.send(result))
})

router.put("/:productId/product/archive", forAdmin, (req, res) => {

	productController.archiveProductById(req.params.productId).then(result => res.send(result))
})

router.put("/:productId/product/unarchive", forAdmin, (req, res) => {

	productController.unarchiveProductById(req.params.productId).then(result => res.send(result))
})

//unarchive
//

module.exports = router