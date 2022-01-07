# Ejs-learn

[Read_Me](https://github.com/RazM10/Web_Learn/blob/master/README.md)
[Html_Css](https://github.com/RazM10/Web_Learn/blob/master/HTML_CSS.md)
[Js](https://github.com/RazM10/Web_Learn/blob/master/JS.md)

## Table of contents
- [Setup Ejs](#setup-ejs-instructions)
- [To store data locally](#to-store-data-locally)
- [Setup Ejs](#setup-ejs)
- [Add css and js files](#add-css-add-js-files)
- [Use of anchor tag](#use-of-anchor-tag)
- [Redirect to another page](#redirect-to-another-page)
- [Use of for loop-if else statement and data pass](#use-of-for-loop-if-else-statement-and-data-pass)
- [Folder traverse](#folder-traverse)
- [Data pass from ui to server](#data-pass-from-ui-to-server)
- [Token pass with header](#token-pass-with-header)
- [Locally data store in browser](#locally-data-store-in-browser)

## Setup ejs instructions

[Cheat_Sheet](https://github.com/RazM10/Web_Learn/blob/master/files/cheetsheet_ejs.txt)

[Dashboard_template_asset_files_deleted](https://github.com/RazM10/Web_Learn/blob/master/files/admin_template_integration)

[Todo_Demo_Project_also_contains_fetch_routes](https://github.com/RazM10/Web_Learn/blob/master/files/ejs_test)

- project setup
```
npm init
npm install express ejs 
npm install express-ejs-layouts // if you need a common layout.ejs file
npm install nodemon --save-dev
```

- server.js ,without common layout.ejs

```
--- server.js ,without common layout.ejs---
const express = require('express');
const app = express();

app.set('view-engine','ejs');

// middleware
app.use(express.json());
app.use(express.static(__dirname + '/public/')); // <link rel="stylesheet" href="/assets/css/argon.css?v=1.2.0" type="text/css">
app.use(express.urlencoded({extended: false})); //*** important for get data in server, when form data post from ejs page.

// routes
app.get('/', async (req,res)=>{
    res.render('layout.ejs');
});

app.listen(3000, (req, res) => {
    console.log("Listing to port 3000")
});
```

- server.js with layout.ejs

```
--- server.js with layout.ejs ---
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.use(expressLayouts);
app.set('view engine','ejs');

// middleware
app.use(express.json());
app.use(express.static(__dirname + '/public/'));
app.use(express.urlencoded({extended: false})); //*** important for get data in server, when form data post from ejs page.

// routes
app.get('/', async (req,res)=>{
    res.render('home');
});

app.listen(3000, (req, res) => {
    console.log("Listing to port 3000")
});
```

- server.js, with layout.ejs. another way

```
--- server.js, with layout.ejs. another way ---
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true})); //*** important for get data in server, when form data post from ejs page.
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/', async (req,res)=>{
    res.render('home.ejs');
});

app.listen(3000, (req, res) => {
    console.log("Listing to port 3000")
});
```

- use default custom layout without default layout.ejs

```
*** use default custom layout without default layout.ejs ***
		const loginView = (req, res) => {
	    		res.render('login.view.ejs', {layout: 'loginLayout.ejs'});
		}
```

## To store data locally

- install
```
npm install node-localstorage
```

- Add a folder 'scracth' in root folder. Then do follow next instructions

- add this in every file, where it is used
```
const {LocalStorage}  = require('node-localstorage');
const localstorage = new LocalStorage('./scracth');
```

- use for save data
```
const obj = {
    email: req.body.email,
    password: req.body.password
};
localstorage.setItem('user', JSON.stringify(obj));
```

- use for get data
```
const data = localstorage.getItem('user') !== null ? JSON.parse(localstorage.getItem('user')) : null;
  if (data !== null) {
    res.render('home');        
  }else {
    res.redirect('/login');
}
```

- use for remove data
```
localstorage.removeItem('user');
```

## Setup Ejs

[Demo Project](https://github.com/RazM10/Web_Learn/blob/master/files/ejs_test)

Install ejs and write following in app.js files to get access of ejs tamplate & css/js file

```
app.set('view-engine','ejs');

//middleware
app.use(express.json());
app.use(express.static(__dirname + '/'));
app.use(express.urlencoded({extended: false}));
app.use('/user', usersRoute);
app.use('/euser', eUsersRoutes);
```

## Add css add js files

```
// Add css file in ejs template. keep file in: root/css/bootstrap.min.css
<link rel="stylesheet" href="../css/bootstrap.min.css">

// Add js file in ejs template. keep file in: root/js/main.js
<script src="../js/main.js"></script>
```

## Use of anchor tag

Also you can pass data from route to ejs file.

```
<a href="/user/profile" class="textColor"><%= name %></a>

// Route. it will navigate you to profile page
router.get('/profile', checkAuthenticated,(req,res)=>{
    res.render('profile.ejs',{name: req.user.name, email: req.user.email, address: req.user.address});
});
```

```
router.get('/login',checkNotAuthenticated,(req,res)=>{
    getAllUser();
    res.render('login.ejs');
});

<div id="register-link" class="text-right">
	<a href="/user/login" style="color:#164072 !important">Already Registered?</a>
</div>
```

## Use of for loop-if else statement and data pass

```
// Open Home page, when start server
router.get('/', async (req,res)=>{
    const users = await User.find();

    res.render('index.ejs', {
        projectName: "Todo",
        pageTitle: "Sign In",
        userArray: users
    });
});

// For loop to iterate array of data
<table>
	<% for(var i = 0; i < userArray.length; i++){ %>
		<tr>
			<td>
				<div class="container">
					<div class="row" style="color: aliceblue;">
						<div class="col-md-4" style="margin-left: 9px;">
							<%= userArray[i].email %>
						</div>
						<div class="col-md-4" style="margin-left:30%;">
							<%= userArray[i].name %>
						</div>
						<div class="col-md-4"></div>
					</div>
				</div>
			</td>
			<!-- <td><%= userArray[i].name %></td> -->
		</tr>
	<% } %>
</table>

// Use of conditional statement in ejs file
<p style="color: red;">
    <% if (failMsg !== " ") { %>
        <%= failMsg %>
    <% } %>
</p>
```

- Data show in js script console

```
<script> 
    console.log("hello")
    console.log("<%= projectName %>");
    // console.log("<%= JSON.stringify(projectName) %>");
</script>
```

- Redirect to another page
```
<% if (yourBoolean) { %>
  <script> document.location.href = '/your-redirect' </script>
<% } %>
```

## Redirect to another page

```
// to google
//window.location.href = "google.com"

// by route
// document.location.href = '/user/'; 
window.location.href = "/user/";
```

- Another
```
<% if (yourBoolean) { %>
  <script> document.location.href = '/your-redirect' </script>
<% } %>
```

## Form data post as put-delete

Route for post data to save in database by data passing form to route.

```
// Route for post data to save in database
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


// Form for Post route to save data
<div id="login">
    <div class="container">
        <div id="login-row" class="row justify-content-center align-items-center">
            <div id="login-column" class="col-md-5">
                    <form action="/user/register" method="post">
                        <h4 class="text-center"><%= r_message %></h4>
                        <h3 class="text-center">Registration</h3>
                        <div class="form-group">
                            <p style="color: red;">
                                <% if (failMsg !== " ") { %>
                                    <%= failMsg %>
                                <% } %>
                            </p>
                            <label for="name">Name</label><br>
                            <input type="text" name="name" id="name" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" name="email" id="email" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" name="password" id="password" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="address">Address</label>
                            <input type="text" name="address" id="address" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <input type="submit" name="submit" class="btn btn-info btn-md" style="background-color:#333333 !important" value="Registration">
                        </div>
                        <div id="register-link" class="text-right">
                            <a href="/user/login" style="color:#164072 !important">Already Registered?</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
```

Setup method-override to convert Post request to delete/put request.

```
// use this middleware in route page, otherwise will not work 
// middleware for to convert ejs's POST request to router's DELETE/PUT request
const methodOverride = require('method-override');
router.use(methodOverride('_method'));
```

For update route

```
// update route
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


// For update value. you can also pass a hidden field instead of using url params
<div class="container">
    <div class="row">
        <div class="col-lg-2"></div>
        <div class="col-lg-8">
            <form id="form" action="/euser/update2?_method=PUT" method="POST">
                <div class="form-group">
                    <input type="hidden" name="hiddenName" value="<%= userArray[0]['name']%>">
                    <label for="todo" style="color: #DDBE15;font-size: 30px;">Enter User name for update</label>
                    <input type="text" class="form-control" name="name" id="name" placeholder="Enter User name for update"><br>
                    <input type="text" class="form-control" name="newName" id="newName" placeholder="Enter New User name for update"><br>
                    <button type="submit" class="btn btn-primary" style="background-color: #DDBE15;">Update</button>
                    <br><br><br><br>
                </div>
                
            </form>
        </div>
        <div class="col-lg-2"></div>
    </div>
</div>
```

For delete route

```
// Delete route
router.delete('/logout', (req, res) => {
    console.log("From Delete route");
    res.redirect('/euser/taskShow');
});


// Form For delete route 
<form action="/euser/logout?_method=DELETE" method="POST">
    <button type="submit">Log Out</button>
</form>
```

## Install specific version of package

```
npm install mongoose@6.0.4
```

- TextField undefined error removed by installing 5.9.17 version of mongoose

```
npm install mongoose@5.9.17
```

## Token pass with header

```
// artical link: https://stackoverflow.com/questions/57903897/how-to-send-token-in-header-from-viewejs

// save token in client side in web
<script>
    localStorage.setItem('token', "<%= JSON.stringify(token) %>"); // <- setup token into localStorage, (but i think it's not good place for that, and would be better get token with another authorization request)
</script>

// pass token with anchor-tag to server
<a href="/user/home?authorization=Bearer "+data>Home 
	 <span class="sr-only">(current)</span>
</a>

// get token from local storage, and send it to server with post route in fetch
var jwtToken = localStorage.getItem('token')
var headers = {}

if(jwtToken) {
	headers['Authorization'] = 'Bearer ' + jwtToken
}

return fetch(url, {
	method: 'POST', // *GET, POST, PUT, DELETE, etc.
	mode: 'cors',
	headers: headers
})

// received token and slice it from 'Bearer ..token..'. so, slice it with 7.
let token = req.get('Authorization');
token = token.slice(7, token.length);
```

- Receive
```
// let token = req.headers["authorization"];
let token = req.get('Authorization');
```

- Send
```
// add jquery library
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>

// a post fetch route for edite data
editBtn.click(()=>{
	fetch(`/user/task/${todo._id}`,{
		method : "put",
		headers : {
			"Content-Type" : "application/json; charset=utf-8" 
		},
		body : JSON.stringify({task : taskUserInput.val()})
	}).then((response)=>{
		console.log(response);
		return response.json();
	}).then((data)=>{
		console.log(data);
		display.empty();
		getTodos();
		resetTodosInput();
		displayMessage(true,"Edit Successful");
	});
});
```

## Locally data store in browser

The localStorage and sessionStorage properties allow to save key/value pairs in a web browser.

The localStorage object stores data with no expiration date. The data will not be deleted when the browser is closed, and will be available the next day, week, or year.

The localStorage property is read-only.

Tip: Also look at the sessionStorage property which stores data for one session (data is lost when the browser tab is closed).

localStorage:

```
<!DOCTYPE html>
<html>
<body>

<div id="result"></div>

<script>
// Check browser support
if (typeof(Storage) !== "undefined") {
  // Store
  localStorage.setItem("lastname", "Smith");
  // Retrieve
  document.getElementById("result").innerHTML = localStorage.getItem("lastname");
} else {
  document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
}
</script>

</body>
</html>
```

sessionStorage:

```
<!DOCTYPE html>
<html>
<body>

<div id="result"></div>

<script>
// Check browser support
if (typeof(Storage) !== "undefined") {
  // Store
  sessionStorage.setItem("lastname", "Smith");
  // Retrieve
  document.getElementById("result").innerHTML = sessionStorage.getItem("lastname");
} else {
  document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
}
</script>

</body>
</html>
```


## A simple process

- package.json
```
"scripts": {
	"test": "npm start",
	"start": "nodemon server.js" // run: npm start
},
"dependencies": {
	"axios": "^0.24.0",
	"ejs": "^3.1.6",
	"express": "^4.17.2",
	"mongoose": "^5.10.11"
},
"devDependencies": {
	"nodemon": "^2.0.15"
}
```

- server.js
```
const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

// parse request to body-parser
app.use(express.json());

// set view engine
app.set("view engine", "ejs")

// load assets
app.use(express.static(__dirname + '/assets/'));
// <link rel="stylesheet" href="/css/style.css">
// <script src="/js/index.js"></script>

app.get('/', (req,res) => {
    res.send("Hello from server");
});

app.use('/user', require('./server/routers/user.route'));

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});
```

- server/controller/user.controller
```
exports.add = (req, res) => {
    res.redirect('/user');
}

exports.find = (req, res) => {
    res.status(200).json({token: "token", msg: "msg"});
}
```

- server/services/render
```
const axios = require('axios');
const url = "http://localhost:3000";

exports.add_user = (req, res) =>{
    res.render('add_user');
}

exports.home = (req, res) => {
    // Make a get request to /api/users
    axios.get(url+'/user/api/users')
        .then(function(response){
            // res.render('index', { users : response.data });
            res.render('index', { users : response });
        })
        .catch(err =>{
            res.send(err);
        })
}
```

- server/routers/user.route
```
const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/user.controller');

route.get('/', services.add_user);
route.get('/home/', services.home);

// API
route.post('/api/users', controller.add);
route.get('/api/users', controller.find);

module.exports = route;
```

- views/include/_header.ejs or 
```
<link rel="stylesheet" href="/css/style.css">
or 
<script src="/js/index.js"></script>
```

- views/index.ejs
```
<!-- include header -->
<%- include('include/_header') %>
<!-- /include header -->

<tbody>
	<%- include('include/_show') %>
</tbody>

<!-- include footer -->
<%- include('include/_footer') %>
<!-- /include footer -->
```

```
<script> 
    console.log("hello")
    console.log("<%= users.status %>");
    console.log("<%= users.data.token %>");
</script>
```

- server/database/connection.js
```
const mongoose = require('mongoose');

// const DB_CONNECTION_URL="mongodb+srv://jack:jack@cluster0-khwka.mongodb.net/test?retryWrites=true&w=majority";
var DB_CONNECTION_URL="mongodb://localhost:27017/shopDB";

const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect(DB_CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB
```

- server.js
```
// mongodb connection
const connectDB = require('./server/database/connection');
connectDB();
```














