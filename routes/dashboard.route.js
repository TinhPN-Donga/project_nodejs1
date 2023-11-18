var express = require('express');
var router = express.Router();
const {DashboardController} = require('../controllers/index');
const {AuthMiddleware} = require('../middlewares/index');
const upload = require('../utils/config_upload');

/* GET dashboard. */
router.get('/', AuthMiddleware.authentication, AuthMiddleware.saveUserLocal, AuthMiddleware.authorization(true),DashboardController.dashboardPage);

/*[GET] create product page*/
router.get('/create-product', AuthMiddleware.authentication, AuthMiddleware.saveUserLocal, AuthMiddleware.authorization(true),DashboardController.createProductPage);

/*[POST] create product*/
router.post('/create-product', AuthMiddleware.authentication, AuthMiddleware.authorization(true), upload.single('image'), DashboardController.createProduct);

/*[GET] manage products page*/
router.get('/manage-products', AuthMiddleware.authentication, AuthMiddleware.saveUserLocal, AuthMiddleware.authorization(true),DashboardController.manageProductsPage);

/*[GET] edit product page*/
router.get('/products/edit/:id', AuthMiddleware.authentication, AuthMiddleware.saveUserLocal, AuthMiddleware.authorization(true),DashboardController.editProductPage);

/*[GET] detail product page*/
router.get('/products/detail/:id', AuthMiddleware.authentication, AuthMiddleware.saveUserLocal, AuthMiddleware.authorization(true),DashboardController.detailProductPage);

/*[POST] edit product*/
router.post('/products/edit/:id', AuthMiddleware.authentication, AuthMiddleware.authorization(true),upload.single('image'),DashboardController.editProduct);

/*[GET] manage users page*/
router.get('/manage-users', AuthMiddleware.authentication, AuthMiddleware.saveUserLocal, AuthMiddleware.authorization(true),DashboardController.manageUsersPage);

/*[DELETE] delete product*/
router.delete('/products/delete/:id', AuthMiddleware.authentication, AuthMiddleware.saveUserLocal, AuthMiddleware.authorization(true),DashboardController.deleteProduct);

/*[GET] manage cart page*/
router.get('/manage-carts', AuthMiddleware.authentication, AuthMiddleware.saveUserLocal, AuthMiddleware.authorization(true),DashboardController.manageCartsPage);

module.exports = router;
