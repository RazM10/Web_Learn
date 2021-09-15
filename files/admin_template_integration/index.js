// const express = require('express');
// const expressLayouts = require('express-ejs-layouts');
// const path = require('path');

// const app = express();

// app.use(expressLayouts);
// app.set('view engine', 'ejs');
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());

// app.use(express.static(path.join(__dirname, 'public')));

// // routes
// app.get('/', async (req,res)=>{
//     res.render('home.ejs');
// });

// app.listen(3000, (req, res) => {
//     console.log("Listing to port 3000")
// });

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const homeRoutes = require('./routes/home.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(expressLayouts);
app.set('view engine','ejs');

// middleware
app.use(express.json());
app.use(express.static(__dirname + '/public/'));
app.use(express.urlencoded({extended: false}));
app.use(homeRoutes.routes);
app.use(authRoutes.routes);


app.listen(3000, (req, res) => {
    console.log("Listing to port 3000")
});