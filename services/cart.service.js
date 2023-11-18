const {CartModel} = require('../models/index');
const mongoose = require('mongoose');
const { ObjectId } =  mongoose.Types;
const findAll = () => {
    return CartModel.find().sort('-createdAt');
}

const find = (query = {}, select={}, populate = '') => {
    return CartModel.find(query,select).populate(populate).sort('-createdAt');
}

const count = (query = {}, option = {}) => {
    return CartModel.find().count(query,option);
}

const findQueryWithAggregate = async (query = []) => {
    return  CartModel.aggregate(query);
}

const paginate = (limit, skip = 0) => {
    return CartModel.find().sort('-createdAt').skip(skip).limit(limit);
}

const findById = (id) =>{
    return CartModel.findById(id);
}

const create = (data) => {
    const newProduct = new CartModel(data);
    return newProduct.save();
}

const update  = (id, data) =>{
    return CartModel.findByIdAndUpdate(id, data);
}

const deleteAll = () =>{
    return CartModel.deleteMany();
}

const deleteById = (id) =>{
    return CartModel.findOneAndDelete({_id: id});
}

module.exports = {count, find, findAll, findById,create, update, deleteAll, deleteById, paginate, findQueryWithAggregate};