const { ProductService, UserService , CartService} = require('../services/index');

// render dashboard page
const dashboardPage = async (req, res, next) => {
    try {
        const products = await ProductService.paginate(5);
        const users = await UserService.paginate(5);
        let queryAggre = [
            {
                $sort: { createdAt: -1 }
            },
            {
                $skip: 0
            },
            { $limit : 5 },
            {
                $lookup: {
                    from: 'products',  // Tên của collection chứa thông tin sản phẩm
                    localField: 'productID',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                $unwind: '$product'
            },
        ];
        const carts = await CartService.findQueryWithAggregate(queryAggre);
        const countCarts = await CartService.count();
        const countProducts = await ProductService.count();
        const countUsers = await UserService.count();
        res.render('pages/dashboard/dashboard', {countCarts, countProducts,countUsers, products, users, carts});
    } catch (error) {
        next(error);
    }
}

// render manage products page
const manageProductsPage = async (req, res, next) => {
    try {
        let skip = 0;
        let limit = 5;
        if(req.query.skip){
            if(req.query.skip <= 1){
                res.redirect('/dashboard/manage-products');
            }
            skip = (req.query.skip - 1) * limit;
        }
        const products = await ProductService.paginate(limit, skip);
        const countProducts = await ProductService.count();
        if(products.length == 0) {
            const querySkip = Math.ceil(countProducts/5);
            return res.redirect('/dashboard/manage-products?skip='+ querySkip);
        }
        res.render('pages/dashboard/dashboard_manage_products',{products, countProducts, skip});
    } catch (error) {
        res.redirect('/dashboard/manage-products');
    }
}

// render manage products page
const manageCartsPage = async (req, res, next) => {
    try {
        let skip = 0;
        if(req.query.skip){
            if(req.query.skip == 1){
                res.redirect('/dashboard/manage-carts');
            }
            skip = (req.query.skip - 1) * 5;
        }
        let queryAggre = [
            {
                $sort: { createdAt: -1 }
            },
            {
                $skip: skip
            },
            { $limit : 5 },
            {
                $lookup: {
                    from: 'products',  // Tên của collection chứa thông tin sản phẩm
                    localField: 'productID',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                $unwind: '$product'
            },
        ];
        const carts = await CartService.findQueryWithAggregate(queryAggre);
        const countCarts = await CartService.count();
        if(carts.length == 0) {
            const querySkip = Math.ceil(countCarts/5);
            return res.redirect('/dashboard/manage-carts?skip='+ querySkip);
        }
        res.render('pages/dashboard/dashboard_manage_carts',{carts,countCarts,skip});
    } catch (error) {
        res.redirect('/dashboard/manage-carts');
    }
}

// render manage users page
const manageUsersPage = async (req, res) => {
    const users = await UserService.findAll();
    res.render('pages/dashboard/dashboard_manage_users',{users});
}

//render create product page
const createProductPage = async (req, res) => {
    res.render('pages/dashboard/dashboard_create_product');
}

//handle create a new product
const createProduct = async (req, res) => {
    try {
        const body = req.body;
        let data = {...body};
        if (req.file) {
            const image = req.file;
            data = {...data, image: image.filename};
        }
        await ProductService.create(data);
        return res.redirect('/dashboard/manage-products');
    } catch (error) {
        console.log('error: ' + error.message);
        return res.redirect('/dashboard/create-product?error='+'Create Product Failed!!!');
    }
}

//render detail product page
const detailProductPage = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await ProductService.findById(id);
        if(!product) throw new Error('Not found post detail');
        console.log(`product ${product}`);
        res.render('pages/dashboard/dashboard_detail_product',{product, error: null});
    } catch (error) {
        console.log(error.message);
        res.render('pages/dashboard/dashboard_detail_product',{error: 'Not found post detail'});
    }
}

//render edit product page
const editProductPage = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await ProductService.findById(id);
        if(!product) throw new Error('Not found post detail');
        res.render('pages/dashboard/dashboard_edit_product',{product, error: null});
    } catch (error) {
        console.log(error.message);
        res.redirect('/dashboard/manage-products');
    }
}

//hanle edit product 
const editProduct = async (req, res) => {
    try {
        const {id} = req.params;
        let data = req.body;
        if (req.file) {
            const image = req.file;
            data = {...data, image: image.filename};
        }
        const product = await ProductService.update(id, data);
        if(!product) throw new Error('Not found post detail');
        res.redirect(`/dashboard/products/detail/${id}`);
    } catch (error) {
        return res.redirect('/dashboard/manage-products');
    }
}

//hanle delete product
const deleteProduct  = async (req, res) =>{
    try {
        const {id} = req.params;
        const data = await ProductService.deleteById(id);
        if(!data) throw new Error('Not found post delete');
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}
module.exports = { manageProductsPage,manageCartsPage, dashboardPage, manageUsersPage, createProductPage, detailProductPage, editProductPage, editProduct,createProduct, deleteProduct}