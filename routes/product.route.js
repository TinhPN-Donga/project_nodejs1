var express = require('express');
var router = express.Router();

const {ProductController} = require('../controllers/index');

/* [GET] Products. */
router.get('/', ProductController.getProducts);

/* [GET] detail product. */
router.get('/:id', ProductController.getProduct);

/* [POST] create a new product. */
router.post('/create', ProductController.postCreateProduct);

/* [PUT] update product. */
router.put('/update/:id', ProductController.putUpdateProduct);

/* [DELETE] delete a product by _id. */
router.delete('/delete/:id', ProductController.deleteProduct);

/* [DELETE] delete all product. */
router.delete('/delete', ProductController.deleteAllProducts);


module.exports = router;
