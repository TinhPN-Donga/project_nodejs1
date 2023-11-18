const {ProductModel} = require('../models/index');

const findAll = () => {
    return ProductModel.find().sort('-createdAt');
}

const find = (query={}) => {
    return ProductModel.find(query).sort('-createdAt');
}

const count = (query = {}, option= {}) => {
    return ProductModel.find().count(query, option);
}

const paginate = (limit, skip = 0) => {
    return ProductModel.find().sort('-createdAt').skip(skip).limit(limit);
}

const findById = (id) =>{
    return ProductModel.findById(id);
}

const create = (data) => {
    const newProduct = new ProductModel(data);
    return newProduct.save();
}

const update  = (id, data) =>{
    return ProductModel.findByIdAndUpdate(id, data);
}

const deleteAll = () =>{
    return ProductModel.deleteMany();
}

const deleteById = (id) =>{
    return ProductModel.findOneAndDelete({_id: id});
}

module.exports = {find, count, findAll, findById,create, update, deleteAll, deleteById, paginate}