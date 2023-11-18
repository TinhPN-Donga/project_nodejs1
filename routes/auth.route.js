var express = require('express');
var router = express.Router();
const {AuthController} = require('../controllers/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource Auth');
});

/* GET login page. */
router.get('/login', AuthController.getLoginPage);

/* GET register page. */
router.get('/register', AuthController.getRegistePage);

/* [POST] login. */
router.post('/login', AuthController.login);

/* [POST] register*/ 
router.post('/register', AuthController.register);

/* [POST] [GET] logout*/ 
router.post('/logout', AuthController.logout);
router.get('/logout', AuthController.logout);

module.exports = router;
