const {ProductService, UserService, CartService} = require('../services/index');

const homePage = async(req, res) =>{
    const products = await ProductService.paginate(6);
    res.render('index',{products});
}

const productsPage = async(req, res) =>{
    const products = await ProductService.findAll();
    res.render('pages/products',{products});
}

const searchPage = async(req, res) =>{
    const {search} = req.query;
    let products = [];
    if(search){
        const query = {
            name: { $regex: search, $options: 'i' }
        }
        products = await ProductService.find(query);
    }else{
        products = await ProductService.findAll();
    }
    res.render('pages/search',{products, search});
}

const profilePage = async(req, res) =>{
    res.render('pages/profile');
}

const productDetailPage = async(req, res, next) =>{
    try {
        const {id} = req.params;
        const product = await ProductService.findById(id);
        if(!product){
            throw new Error('Not Found Product'); 
        }
        res.render('pages/detail_product', {product});
    } catch (error) {
        next(error.message);
        // res.redirect('/products');
    }
}


module.exports = {homePage, productsPage, profilePage, productDetailPage, searchPage}