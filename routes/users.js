var express = require('express');
var router = express.Router();
const {UserController} = require('../controllers/index');

/* GET users listing. */
router.get('/', UserController.getAllUsers);

/* GET users listing. */
router.delete('/deletes', UserController.deleteUsers );

module.exports = router;
