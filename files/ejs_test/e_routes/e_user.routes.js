const express = require('express');
const router = express.Router();
const User = require('../models/TUser');

//middleware for to convert ejs's POST request to router's DELETE/PUT request
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

router.get('/', async (req,res)=>{
    const users = await User.find();

    res.render('index.ejs', {
        projectName: "Todo",
        pageTitle: "Sign In",
        userArray: users
    });
});

router.get('/taskShow', async (req, res) => {
    const users = await User.find();

    res.render('taskShow.ejs', {
        userArray: users
    });
});

router.post('/update', async (req, res)=> {
    try {
        const updateUser = await User.updateOne(
            {name: req.body.name},
            {$set: {name: req.body.newName}},{returnOriginal : true},(err,result) => {
                if(err)
                    console.log(err);
                else
                    res.redirect('/euser/taskShow');
            }
        );
    } catch (error) {
        res.send(error);
    }
});

router.put('/update2', async (req, res)=> {
    var hiddenName = req.body.hiddenName;
    console.log("Bro hidden value is: "+hiddenName);
    try {
        const updateUser = await User.updateOne(
            {name: req.body.name},
            {$set: {name: req.body.newName}},{returnOriginal : true},(err,result) => {
                if(err)
                    console.log(err);
                else
                    res.redirect('/euser/taskShow');
            }
        );
    } catch (error) {
        res.send(error);
    }
});

router.delete('/logout', (req, res) => {
    console.log("From Delete route");
    res.redirect('/euser/taskShow');
});

module.exports = router;