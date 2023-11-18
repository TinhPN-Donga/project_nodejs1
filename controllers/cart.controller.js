const {ProductService, UserService, CartService} = require('../services/index');
const mongoose = require('mongoose');
const { ObjectId } =  mongoose.Types;

const myCartPage = async(req, res) =>{
    try{
        // let query = {};
    let skip = 0;
    let limit = 4;
    if(req.query.skip){
        if(req.query.skip <= 1){
            res.redirect('/carts/my-cart');
        }
        skip = (req.query.skip - 1) * limit;
    }
    let queryAggre = [];
    if(req.user){
        // query = {userID: req.user._id};
        queryAggre = [
            {
                $sort: { createdAt: -1 }
            },
            {
                $match: {userID: new ObjectId(req.user._id)}
            },
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
            {
                $skip: skip
            },
            {
                $limit: limit
            },
        ];
    }else{
        res.redirect('/auth/logout');
    }
    // const carts = await CartService.find(query);
    const carts = await CartService.findQueryWithAggregate(queryAggre);
    const countCarts = await CartService.count({userID: new ObjectId(req.user._id)});
    if(carts.length == 0) {
        const querySkip = Math.ceil(countCarts/limit);
        return res.redirect('/carts/my-cart?skip='+ querySkip);
    }
    res.render('pages/my_cart',{carts, skip, countCarts, limit});
    // res.json(carts);
    }catch(e){
        res.redirect('/carts/my-cart');
    }
}

const buyNow = async(req, res, next) =>{
    try {
        const {idProduct} = req.params;
        const product = await ProductService.findById(idProduct);
        if(!product){
            throw new Error('Not Found Product'); 
        }
        if(!req.user){
            res.redirect('/auth/logout');
        }
        const newCart = {productID: idProduct, userID: req.user._id};
        await CartService.create(newCart);
        res.redirect('/carts');
    } catch (error) {
        console.log(error.message);
        next(error.message);
        // res.redirect('/products');
    }
}

module.exports = {myCartPage, buyNow}