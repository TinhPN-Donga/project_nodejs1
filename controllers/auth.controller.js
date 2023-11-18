const {UserService} = require('../services/index');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const validate = require('../utils/validate');

const defaultResult = {
    message: 'success',
    error: null,
    result: null
}
const getLoginPage = async (req, res, next) => {
    res.render('pages/login');
}

const getRegistePage = async (req, res, next) => {
    res.render('pages/register');
}

const register = async (req, res, next) =>{
    try {
        const body = req.body;
        let newData = {...body};
        if(!newData.password || newData.password.length < 6){
            throw new Error('Password must be at least 6 characters');
        }

        if(!newData.email || !validate.isEmail(newData.email)){
            throw new Error('Email is wrong');
        }
       
        const emailExisted = await UserService.findByEmail(newData.email);
        if(emailExisted){
            throw new Error('Email already exists');
        }
        const hashPass = bcrypt.hashSync(newData.password, saltRounds);
        newData = {...newData, password: hashPass}

        const newUser = await UserService.create(newData);
        const result = {...defaultResult, result: newUser};
        res.cookie('user', JSON.stringify(user));
        res.redirect('/');
    } catch (error) {
        const result = {...defaultResult, error: error.message, message: 'failed'};
        // return res.status(500).json(result);
        res.redirect(`/auth/register?error=${error.message}`);
    }
}

const login = async (req, res, next) =>{
    try {
        const body = req.body;
        if(!body.email || !validate.isEmail(body.email)){
            throw new Error('Email is wrong');
        }
        if(!body.password || body.password.length < 6){
            throw new Error('Password is wrong');
        }
        const user = await UserService.findByEmail(body.email);
        if(!user){
            throw new Error('Email is not exists');
        }
        let checkPass = await bcrypt.compare(body.password, user.password);
        if(checkPass){
            const result = {...defaultResult, result: user};
            res.cookie('user', JSON.stringify(user));
            res.redirect('/');

        }else{
            throw new Error('Password is wrong');
        }
    } catch (error) {
        const result = {...defaultResult, error: error.message, message: 'failed'};
        res.redirect(`/auth/login?error=${error.message}`);
    }
}


const logout = async (req, res, next) =>{
    if(req.cookies.user){
        res.clearCookie('user');
    }
    res.redirect('/auth/login');
}


module.exports = {login, register, logout,getLoginPage, getRegistePage}