var express = require('express');
var router = express.Router();
const {CartController, UserController} = require('../controllers/index');
const {AuthMiddleware} = require('../middlewares/index');

/* GET home page. */
router.get('/', AuthMiddleware.authentication,  AuthMiddleware.saveUserLocal, (req, res) => {
    res.redirect('/carts/my-cart');
});

/*[GET] go to home page*/
router.get('/my-cart', AuthMiddleware.authentication, AuthMiddleware.saveUserLocal, CartController.myCartPage);

/*[POST] Buy Now*/
router.post('/buy-now/:idProduct', AuthMiddleware.authentication, AuthMiddleware.saveUserLocal, CartController.buyNow);

module.exports = router;