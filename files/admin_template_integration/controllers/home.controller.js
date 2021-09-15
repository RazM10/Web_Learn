const {LocalStorage}  = require('node-localstorage');
const localstorage = new LocalStorage('./scracth');

const indexView = (req, res) => {
    const data = localstorage.getItem('user') !== null ? JSON.parse(localstorage.getItem('user')) : null;
    if (data !== null) {
        console.log(data);
        res.render('home.view.ejs');        
    }else {
        res.redirect('/login');
    }
}

const iconsView = (req, res) => {
    res.render('icons.view.ejs');
}

const mapView = (req, res) => {
    res.render('map.view.ejs');
}

const profileView = (req, res) => {
    res.render('profile.view.ejs');
}

const tableView = (req, res) => {
    res.render('table.view.ejs');
}

module.exports = {
    indexView,
    iconsView,
    mapView,
    profileView,
    tableView
};