const {UserService} = require('../services/index');

const defaultResult = {
    message: 'success',
    error: null,
    result: null
}
const getAllUsers = async (req, res, next) =>{
    try {
        const users = await UserService.findAll();
        const result = {...defaultResult, result: users};
        return res.status(200).json(result);
    } catch (error) {
        const result = {...defaultResult, error: error.message, message: 'failed'};
        return res.status(500).json(result);
    }
}

const getUser = async (req, res, next) =>{
    try {
        const {id} = req.params;
        const user = await UserService.findById(id);
        const result = {...defaultResult, result: user};
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({message: error.message, message: 'failed'});
    }
}

const deleteUsers = async (req, res) => {
    try {
        const userDelete = await UserService.deleteAll();
        const result = {...defaultResult, result: userDelete};
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({message: error.message, message: 'failed'});
    }
}

const uploadAvatar = async (req, res) => {
    try {
        const id = res.locals.user._id;
        let data = null;
        if (req.file) {
            const image = req.file;
            data = {id, avatar: image.filename};
            
        }
        if(!data){
            return res.redirect('/profile');
        }
        await UserService.update(id, data);
        res.cookie('user', JSON.stringify({...res.locals.user, avatar: data.avatar}));
        return res.redirect('/profile');
    } catch (error) {
        console.log(error.message);
        return res.redirect('/profile?error='+'upload avatar failed!');
    }
}

module.exports = {getAllUsers, getUser, deleteUsers, uploadAvatar}