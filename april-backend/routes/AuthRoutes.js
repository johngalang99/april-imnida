const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController')
const auth = require('../auth');


router.post("/register", (req, res) => {

	AuthController.register(req.body).then( result => res.send(result))
})

router.post("/login", (req, res) => {

	AuthController.login(req.body).then(result => res.send(result))
})

router.post("/:userID/userUpdate", (req, res) => {

	AuthController.userUpdate(req.params.userID, req.body).then( result => res.send(result))
})

module.exports = router