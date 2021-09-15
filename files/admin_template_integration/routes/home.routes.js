const express = require('express');
const router = express.Router();

const {indexView, iconsView, mapView, profileView, tableView} = require('../controllers/home.controller');

router.get('/', indexView);
router.get('/icons', iconsView);
router.get('/map', mapView);
router.get('/profile', profileView);
router.get('/table', tableView);

module.exports = {
    routes: router
};