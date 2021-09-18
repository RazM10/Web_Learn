# Node-learn

[Ejs](https://github.com/RazM10/Web_Learn/blob/master/EJS.md)
[Html_Css](https://github.com/RazM10/Web_Learn/blob/master/HTML_CSS.md)
[Js](https://github.com/RazM10/Web_Learn/blob/master/JS.md)

## Table of contents
- [Status code](#status-code)
- [Node js intallation instructions](#node-js-intallation-instructions)
- [npm instuction for initialize project](#npm-instuction-for-initialize-project)
- [MongoDb intallation instructions](#mongoDb-intallation-instructions)
- [Node js express mongodb restful crud api](#node-js-express-mongodb-restful-crud-api)
- [Jwt token for login](#jwt-token-for-login)
- [Folder traverse](#folder-traverse)
- [Data pass from ui to server](#data-pass-from-ui-to-server)

## Status code

```
// return from node js server
return res.status(403).json("Username incorrect");
return res.status(403).json('token': token, 'msg': "Username incorrect");

// check on mobile font-end
if(response.StatusCode == 200)
  print(response.body);
  
// codes are
Informational responses ( 100 – 199 )
Successful responses ( 200 – 299 )
Redirects ( 300 – 399 )
Client errors ( 400 – 499 )
Server errors ( 500 – 599 )

// collect from project
500 -> Error in retrieving data
403 -> Password is incorrect / username is incorrect / save not ok / 404 not found
200-> Save ok / 200 0k / success / 201 Added
```

## Node js intallation instructions

[Txt File](https://github.com/RazM10/Web_Learn/blob/master/files/node-install-step.txt)

## npm instuction for initialize project

Tutorial link: https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/

- To initial a project and install package.json command
```
npm init
```

- To install dependence command
```
npm i express mongoose ejs
```

- To install dependence as developent purpose command
```
npm i --save-dev nodemon detenv
```

- A dependence uninstall command
```
npm uninstall body-parser
```

- node server.js == npm run start / npm start
```
"scripts": {
  "start": "server.js"
  //"start": "nodemon server.js"
},
```

- server.js
```
const express = require('express');
// create express appCodeName
const app = express();


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(express.json());


// define a simple route
app.get('/', (req, res) => {
	res.json({"message": "Welcome to Web Page with nodemon"});
});


// require person routes
const personRoute = require('./jwt/person.routes');
app.use('/jwt', personRoute);


// listen for requests
app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});
```

When use mongoose

```
// configuring the database
// const dbConfig = require('./config/database.config');
const url= "mongodb://localhost:27017/template"
const mongoose = require('mongoose');

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
	useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
```

- person.routes.js
```
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

//home page
router.get('/home', (req, res) => {
    res.send('Now we are in Jwt home page.');
});

//get all user
router.get('/allUsers', (req,res) => {
	User.find()
    .then(users => {
        res.send(users);
    }).catch(err =>  {
        res.status(500).send({
            message: err.message || "some error occurred while rettieving users."
        });
    });
});
```

## MongoDb intallation instructions

[Txt File](https://github.com/RazM10/Web_Learn/blob/master/files/mongodb-install.txt)

Model demo

```
const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Person', PersonSchema);
```

For designing mongoose model, different types of attributes

```
title: String
comments: [{body: String, date: Date}],
date: {type: Date, default: Date.now},
hidden: Boolean,
meta: {
	votes: Number,
	favs: Number
},

// for auto populate timestamps, install mongoose-autopopulate package, then add below code
,{timestamps: ture}).plugin(require('mongoose-autopopulate'));

age: {type:number, min: 18, max: 65}

stuff: {type: String, lowercase: true, trim: true}

unique: true, sparse: true, default: null, default:''
userType: {type: String, enum: ['user', 'admin'], default: 'user']}
```

## Node js express mongodb restful crud api

[Files](https://github.com/RazM10/Web_Learn/blob/master/files/node-js-express-mongodb-restful-crud-api)

## Jwt token for login

[Files](https://github.com/RazM10/Web_Learn/blob/master/files/node-js-express-mongodb-restful-crud-api/jwt)

```
npm install jsonwebtoken


// secret key
module.exports={
    key:"JwtLoginApp"
}


// middleware to check user/token is validate or note
const jwt = require('jsonwebtoken');
const config = require('./config');

const checkToken = (req, res, next) => {
    let token = req.headers["authorization"];
    console.log(token);
    token = token.slice(7, token.length);
    if (token){
        jwt.verify(token, config.key, (err, decoded) => {
            if (err){
                return res.json({
                    status: false,
                    msg: "token is invalid"
                });
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            status: false,
            msg: "Token is not provided",
        });
    }
};

module.exports = {
    checkToken: checkToken
};


// in router
const config = require('./config');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');

	// login person
router.post("/login", async (req, res) => {
    Person.findOne({name: req.body.name}, (err, result) => {
        if(err) return res.status(500).json({msg: err});
        if(result == null) {
            return res.status(403).json("Username incorrect");
        }
        if (result.password === req.body.password){
            // implementation of jwt token functionality
            let token = jwt.sign({name: req.body.name}, config.key, {
                expiresIn: "24h",
            });
            res.send({
                token: token,
                msg: "Success",
            });
        } else {
            res.status(403).json("password is incorrect");
        }
    });
});

	// now using in router to check the token
router.put("/update/:name", middleware.checkToken, async (req, res) => {});
``` 

## Folder traverse

```
// root
//	- server.js
//	- routes
//		- user.routes.js
//	- controllers
//		- user.controller.js

require('./routes/user.routes')(app); // write this in server.js file
require("../controllers/user.controller"); // write this in user.routes.js file
```

## Data pass from ui to server

```
// when data send by body
app.post('/users', (req, res) => name: req.body.name )

// when data send by url parameter
app.put('/users/:userId, (req, res) => name: req.params.userId )
```
