const express = require('express');
const router = express.Router();
const { forAdmin } = require('../auth');

const UserController = require('../controllers/UserController');

router.post('/email-exists', (req, res) => {
    UserController.checkEmail(req.body).then((result) => res.send(result));
});

/*router.post('/store', (req,res)=>{
    UserController.store(req.body).then( result => res.send(result))
})*/

router.get('', forAdmin, async (req, res) => {
    let result = await UserController.getAllUsers();

    res.send(result);
});

module.exports = router;
