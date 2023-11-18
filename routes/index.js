var express = require('express');
var router = express.Router();
const {HomeController, UserController} = require('../controllers/index');
const {AuthMiddleware} = require('../middlewares/index');
const upload = require('../utils/config_upload');

/* GET home page. */
router.get('/', AuthMiddleware.saveUserLocal, HomeController.homePage);

/*[GET] go to home page*/
router.get('/home', AuthMiddleware.saveUserLocal, (req, res) => {
    res.redirect('/');
});

/*[GET] go to all product*/
router.get('/products', AuthMiddleware.saveUserLocal, HomeController.productsPage);

/*[GET] go to all product*/
router.get('/search', AuthMiddleware.saveUserLocal, HomeController.searchPage);

/*[GET] go to all product*/
router.get('/profile', AuthMiddleware.authentication,AuthMiddleware.saveUserLocal, HomeController.profilePage);

/*[POST] upload avatar*/
router.post('/upload-avatar', AuthMiddleware.authentication, AuthMiddleware.saveUserLocal,upload.single('image'), UserController.uploadAvatar);

/*[GET] go to detail */
router.get('/detail-product/:id', AuthMiddleware.saveUserLocal, HomeController.productDetailPage);

module.exports = router;