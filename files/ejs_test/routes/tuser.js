const express = require('express');
const router = express.Router();
const User = require('../models/TUser');
const bcrypt = require('bcrypt');

const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

var usersArray = [];

const initializePassport = require('../passport/passport-config');
initializePassport(
    passport,
    email => usersArray.find(user => user.email === email),
    id => usersArray.find(user => user.id === id)
);


router.use(flash());
router.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());
router.use(methodOverride('_method'));


//normal task
router.get('/', (req,res)=>{
    res.json(usersArray);
});
router.delete('/', async(req, res) => {
    try {
        const removedUsers = await User.remove();
        res.send(removedUsers);
    } catch (error) {
        res.send({ message: error });
    }
});
async function getAllUser(){
    const users = await User.find();

    usersArray = [];

    for (let index = 0; index < users.length; index++) {
        const element = users[index];
        usersArray.push(element);
    }
    // console.log(usersArray);
}



//login
router.get('/login',checkNotAuthenticated,(req,res)=>{
    getAllUser();
    res.render('login.ejs');
});
router.post('/login',checkNotAuthenticated,passport.authenticate('local',{
    successRedirect: '/user/index',
    failureRedirect: '/user/login',
    failureFlash: true
}));


//logout
router.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/user/login');
})


//register
router.get('/register',checkNotAuthenticated,(req,res)=>{
    getAllUser();
    res.render('register.ejs',{r_message: "Todo",failMsg: " "});
});

router.post('/register',checkNotAuthenticated, async(req,res)=>{

    const getedUser= usersArray.find(user => user.email === req.body.email);

    if(getedUser == null){
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                address: req.body.address
            });
    
            const savedUser = await user.save();
            res.redirect('/user/login');
        } catch (error) {
            res.redirect('/user/registration');
        }

    }else{
        res.render('register.ejs', { r_message: "Todo", failMsg: req.body.email+" is already exist." });
    }
});


//home
router.get('/home',checkAuthenticated,(req,res)=>{
    res.render('home.ejs', { name: req.user.id });
});



function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/user/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/home')
    }
    next()
}



//=== task ===


// const bodyParser = require("body-parser");
// router.use(bodyParser.json());
router.use(express.json());

const Task = require('../models/TTask');

router.get('/index',checkAuthenticated, (req,res)=> {
    res.render('taskIndex.ejs',{name: req.user.name});
});

//get
router.get('/task',checkAuthenticated, async (req, res) => {
    try {
        const todos = await Task.find();
        res.json(todos);
    } catch (error) {
        res.json({ message: error });
    }
    // res.send('We are on users home');
});

//get a specific task
router.get('/task/:taskId', async (req, res) => {
    try {
        const todo = await Task.findById(req.params.taskId)
        res.send(todo);
    } catch (error) {
        res.send({ message: error });
    }
});

//get all task of specific user
router.get('/taskWithId', async (req, res) => {
    try {
        const todo = await Task.find( { "uid": req.user.id } );
        res.json(todo);
    } catch (error) {
        res.json({ message: error });
    }
});

//create
router.post('/task',checkAuthenticated , async (req, res) => {
    const task = new Task({
        uid: req.user.id,
        task: req.body.task
    });
    console.log(task);

    try {
        const savedTodo = await task.save();
        res.json(savedTodo);
    } catch (error) {
        res.json({ message: error });
    }
});


//update a task & return updated data
router.put('/task/:taskId', async (req, res) => {
    try {
        const updateTodo = await Task.updateOne(
            { _id: req.params.taskId },
            { $set: { task: req.body.task } },{returnOriginal : true},(err,result)=>{
                if(err)
                    console.log(err)
                else{
                    res.json(result);
                }      
            });
        // res.send(updateTodo);
    } catch (error) {
        res.send(error);
    }
});
//update after redirect another page
var postedTaskId=null;
var postedTaskName=null;
router.get('/taskPage/',(req,res)=>{
    res.render('edit.ejs',{name: req.user.name+" Todo id= "+postedTaskId+" name is= "+postedTaskName,todoName: postedTaskName});
});
router.post('/taskPage/:taskId',(req,res)=>{
    nameId=req.params.taskId.split('-');
    postedTaskId=nameId[0];
    postedTaskName=nameId[1];
    // console.log("i am in edit route: "+req.params.taskId);
    res.redirect('/user/taskPage');
    // res.render('edit.ejs',{name: req.user.name})
});
router.post('/taskUpdatePage/', async (req, res) => {
    try {
        const updateTodo = await Task.updateOne(
            { _id: postedTaskId },
            { $set: { task: req.body.task } },{returnOriginal : true},(err,result)=>{
                if(err)
                    console.log(err)
                else{
                    res.redirect('/user/index');
                }      
            });
        // res.send(updateTodo);
    } catch (error) {
        res.send(error);
    }
});




//Delete a Task
router.delete('/task/:taskId', async (req, res) => {
    try {
        const removeTask = await Task.deleteOne(
            { _id: req.params.taskId }
        );
        res.send(removeTask);
    } catch (error) {
        res.send({ message: error });
    }
});




    // === Profile ===
router.get('/profile', checkAuthenticated,(req,res)=>{
    res.render('profile.ejs',{name: req.user.name, email: req.user.email, address: req.user.address});
});


module.exports = router;