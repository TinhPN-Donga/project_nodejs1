const auth = (isAdmin = false) => (req, res, next) => {
    if (isAdmin) {
        if (!req.cookies.user) {
            next(new Error('Not Found'));
        }
        const user = JSON.parse(req.cookies.user);
        console.log(user.role);
        if (user.role != 'admin') {
            next(new Error('Not Found'));
        }
    } else {
        if (!req.cookies.user) {
            return res.redirect('/auth/login');
        }
    }
    next();
}

const saveUserLocal = (req, res, next) => {
    if (req.cookies.user) {
        req.user = JSON.parse(req.cookies.user);
        res.locals.user = JSON.parse(req.cookies.user);
    }else{
        res.locals.user = null;
    }
    next();
}

const authorization = (isAdmin = false) => (req, res, next) => {
    const user = JSON.parse(req.cookies.user);
    if(isAdmin){
        if (user.role != 'admin') {
            next(new Error('Not Found'));
        }
    }
    next();
}

const authentication = (req, res, next) => {
    if (!req.cookies.user) {
        return res.redirect('/auth/login');
    }
    next();
}

module.exports = {
    auth,
    authorization,
    authentication,
    saveUserLocal
}