const {LocalStorage}  = require('node-localstorage');
const localstorage = new LocalStorage('./scracth');

const loginView = (req, res) => {
    res.render('login.view.ejs', {layout: 'loginLayout.ejs'});
}

const registerView = (req, res) => {
    try {
        res.render('register.view.ejs', {layout: 'loginLayout.ejs'});
     } catch (error) {
         console.log(error);
     }
}

const handleLogin = (req, res) => {
    console.log(req.body.email);
    console.log("pass: "+req.body.password);
    const obj = {
        email: req.body.email,
        password: req.body.password
    };
    localstorage.setItem('user', JSON.stringify(obj));
    res.redirect('/');
}

const logOut = (req, res) => {
    localstorage.removeItem('user');
    res.redirect('/');
}

module.exports = {
    loginView,
    registerView,
    handleLogin,
    logOut
};