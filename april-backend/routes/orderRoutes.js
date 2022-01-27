const express = require('express')
const router = express.Router()
const { checkout }= require ('../controllers/orderController')
const { verify }= require ('../auth')


const orderController = require('../controllers/orderController')

router.post('', verify, async (req, res)=>{
    try {
        let result = await checkout(req.body, req.user)

        res.status(200).json(result)
    }catch(err){
        res.status(400).json({message: err.message})    }
})

module.exports = router