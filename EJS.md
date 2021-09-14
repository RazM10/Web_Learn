# Ejs-learn

[Read_Me](https://github.com/RazMunir/Flutter-learn/blob/main/cheatsheet_nodejs/README.md)
[Html_Css](https://github.com/RazMunir/Flutter-learn/blob/main/cheatsheet_nodejs/HTML_CSS.md)
[Js](https://github.com/RazMunir/Flutter-learn/blob/main/cheatsheet_nodejs/JS.md)

## Table of contents
- [Setup Ejs](#setup-ejs)
- [Add css and js files](#add-css-add-js-files)
- [Use of anchor tag](#use-of-anchor-tag)
- [Use of for loop-if else statement and data pass](#use-of-for-loop-if-else-statement-and-data-pass)
- [Folder traverse](#folder-traverse)
- [Data pass from ui to server](#data-pass-from-ui-to-server)
- [Locally data store in browser](#locally-data-store-in-browser)

## Setup Ejs

[Demo Project](https://github.com/RazMunir/Flutter-learn/tree/main/cheatsheet_nodejs/files/ejs_test)

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

Data show in js script console

```
<script> 
    console.log("hello")
    console.log("<%= projectName %>");
    // console.log("<%= JSON.stringify(projectName) %>");
</script>
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



