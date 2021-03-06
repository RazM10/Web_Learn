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
- [Json stringify](#json-stringify)
- [Undefined type checking](#undefined-type-checking)
- [Passing Multiple route params](#passing-multiple-route-params)
- [Install specific version of package](#install-specific-version-of-package)

## Status code

```
// return from node js server
return res.status(403).json("Username incorrect");
return res.status(403).json('token': token, 'msg': "Username incorrect");

// check on mobile font-end
if(response.StatusCode == 200)
  print(response.body);
  
// check on web font-end
console.log("status code: "+response.status);
  
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


// parse requests of content-type - application/x-www-form-urlencoded. important for get data in server, when form data post from ejs page.
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

## 

- Server
```
// status code send to client
return res.status(500).json({ msg: err });
// pass data to client
return res.json({
  data: result,
  username: req.params.username,
});
// data received by body from client
const user = new User({
  username: req.body.username,
  password: req.body.password,
  email: req.body.email,
});
// data received by parameter from client
router.route("/delete/:username").delete(
  username: req.params.username,
)
// token get from headers
let token = req.get('Authorization');
```

- Client: Mobile
```
// get statusCode & data from server
var response = await http.get(
  url,
  headers: {"Authorization": "Bearer $token"},
);

if (response.statusCode == 200 || response.statusCode == 201) { // status code
  log.i(response.body);

  return json.decode(response.body); // data
}

// pass data to server
1.
Map<String, String> data = {
  "username": _usernameController.text,
  "password": _passwordController.text,
};
var response =
	await networkHandler.post("/user/login", data);
if (response.statusCode == 200 || response.statusCode == 201) {
  Map<String, dynamic> output = json.decode(response.body);
  print(output["token"]);
}

2.
var response = await http.post(
  url,
  headers: {
	"Content-type": "application/json",
	"Authorization": "Bearer $token"
  },
  body: json.encode(body),
);
return response;

// patch requests
var response = await http.patch(
  url,
  headers: {
	"Content-type": "application/json",
	"Authorization": "Bearer $token"
  },
  body: json.encode(body),
);
```

- Client: web
```
fetch(`/user/task/${todo._id}`,{
	method : "put",
	headers : {
		"Content-Type" : "application/json; charset=utf-8" 
	},
	body : JSON.stringify({task : taskUserInput.val()})
}).then((response)=>{
	console.log(response); // here you can check status code
	return response.json();
}).then((data)=>{
	console.log(data.task);
	console.log(data.createdAt);
});
```

## Json stringify

-  json data convert to string to sent data to server

```
const obj = {name: "John", age: 30, city: "New York"};
const myJSON = JSON.stringify(obj); // {"name":"John","age":30,"city":"New York"}
```

## Undefined type checking

```
if(typeof token === 'undefined'){
  res.redirect('/user/login');
  return;
}
```

## Passing multiple route params

```
// passing two params with link
http://localhost:3000/user/home/no/name

// route
router.get('/home/:active/:name', multiParamsRoute);

// getting value in routes
req.params.active
req.params.name
```

## Install specific version of package

```
npm install mongoose@6.0.4
```

- TextField undefined error removed by installing 5.9.17 version of mongoose

```
npm install mongoose@5.9.17
```

## Multer for upload image

- install
```
npm install multer
```

- model (Upload.model.js)
```
const mongoose=require('mongoose');

const UploadSchema=mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: "",
    },
});

module.exports=mongoose.model('Upload',UploadSchema);
```

- routes (upload.routes.js)
```
const express = require('express');
const router = express.Router();
const Upload = require('../models/Upload');

const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".jpg");
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 6,
  },
  fileFilter: fileFilter,
});

router.post('/add', (req, res) => {
    const upload = new Upload({
        name: req.body.name
    });

    try {
        const savedUpload = upload.save();
        res.json(savedUpload);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/getall', async (req, res) => {
    try {
        const uploads = await Upload.find();
        res.json(uploads);
    } catch (error) {
        res.json({ message: error });
    }
    // res.send('We are on users home');
});

router.patch("/add/image/:id", upload.single("img"), (req, res) => {
  Upload.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        img: req.file.path,
      },
    },
    { new: true },
    (err, upload) => {
      if (err) return res.status(500).send(err);
      const response = {
        message: "image added successfully updated",
        data: upload,
      };
      return res.status(200).send(response);
    }
  );
});

module.exports = router;
```

- app.js
```
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const usersRoute = require('./routes/users');
const uploadRoute = require('./routes/upload');

const DB_CONNECTION_URL=mongodb://localhost:27017/userDB;
//mongoose
mongoose.connect(DB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function (err, db) {
    if (err) throw err;
    else console.log('Connected to DB');
});

// to show the image in web browser from uploads folder by uploaded path
app.use('/uploads', express.static("uploads"));

//middleware
app.use(express.json());

//import routes
app.use('/users', usersRoute);
app.use('/upload', uploadRoute);

//routes
app.get('/', (req, res) => {
    console.log('We are on Home');
    res.send('We are on Home');
});

app.listen(3000);
```

- packages
```
"body-parser": "^1.19.0",
"dotenv": "^8.2.0",
"express": "^4.17.1",
"mongoose": "^5.9.17",
"multer": "^1.4.3",
"nodemon": "^2.0.2"
```











