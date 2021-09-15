const express = require('express');
const router = express.Router();

const {loginView, registerView, handleLogin, logOut} = require('../controllers/auth.controller');

router.get('/login', loginView);

router.get('/register', registerView);

router.post('/postLogin', handleLogin);

router.post('/logout', logOut);

module.exports = {
    routes: router
}