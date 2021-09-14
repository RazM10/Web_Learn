const express = require('express');
const app = express();
const mongoose = require('mongoose');
const usersRoute = require('./routes/tuser');
const eUsersRoutes = require('./e_routes/e_user.routes');

//mongoose
var url="mongodb://localhost:27017/taskDB";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    else console.log('Connected to DB');
});


app.set('view-engine','ejs');

//middleware
app.use(express.json());
app.use(express.static(__dirname + '/'));
app.use(express.urlencoded({extended: false}));
app.use('/user', usersRoute);
app.use('/euser', eUsersRoutes);

//middleware for to convert ejs's POST request to router's DELETE/PUT request
// const methodOverride = require('method-override');
// app.use(methodOverride('_method'));


app.get('/',(req,res)=>{
    res.send('we are on home.');
});

app.listen(3000);