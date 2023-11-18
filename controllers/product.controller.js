const {ProductService} = require('../services/index');

const defaultResult = {
    message: 'success',
    error: null,
    status: true,
    result: null
}

const getProducts = async (req, res) =>{
    try {
        const data = await ProductService.findAll();
        const result = {...defaultResult, result: data};
        return res.status(200).json(result);
    } catch (error) {
        const result = {...defaultResult, error: error.message, status: false, message: 'failed'};
        return res.status(500).json(result);
    }
}

const getProduct = async (req, res) =>{
    try {
        const {id} = req.params;
        const data = await ProductService.findById(id);
        if(!data) throw new Error('Not found post detail');
        const result = {...defaultResult, result: data};
        return res.status(200).json(result);
    } catch (error) {
        const result = {...defaultResult, error: error.message, status: false, message: 'failed'};
        return res.status(500).json(result);
    }
}

const postCreateProduct = async (req, res) =>{
    try {
        const body = req.body
        const data = await ProductService.create(body);
        const result = {...defaultResult, result: data};
        return res.status(201).json(result);
    } catch (error) {
        const result = {...defaultResult, error: error.message, status: false, message: 'failed'};
        return res.status(500).json(result);
    }
}

const putUpdateProduct = async (req, res) =>{
    try {
        const {id} = req.params;
        const body = req.body
        const data = await ProductService.update(id, body);
        const result = {...defaultResult, result: data};
        return res.status(200).json(result);
    } catch (error) {
        const result = {...defaultResult, error: error.message, status: false, message: 'failed'};
        return res.status(500).json(result);
    }
}

const deleteAllProducts = async (req, res) =>{
    try {
        const data = await ProductService.deleteAll();
        const result = {...defaultResult, result: data};
        return res.status(200).json(result);
    } catch (error) {
        const result = {...defaultResult, error: error.message, status: false, message: 'failed'};
        return res.status(500).json(result);
    }
}

const deleteProduct  = async (req, res) =>{
    try {
        const {id} = req.params;
        const data = await ProductService.deleteById(id);
        if(!data) throw new Error('Not found post delete');
        const result = {...defaultResult, result: data};
        return res.status(200).json(result);
    } catch (error) {
        const result = {...defaultResult, error: error.message, status: false, message: 'failed'};
        return res.status(500).json(result);
    }
}

module.exports = {
    getProducts,
    getProduct,
    postCreateProduct,
    putUpdateProduct,
    deleteAllProducts,
    deleteProduct
}