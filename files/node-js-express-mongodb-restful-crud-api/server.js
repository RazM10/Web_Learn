const express = require('express');

// create express appCodeName
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

// configuring the database
const dbConfig = require('./config/database.config');
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

// define a simple route
app.get('/', (req, res) => {
	res.json({"message": "Welcome to Web Page with nodemon"});
});

// require users routes
require('./routes/user.routes')(app);

// require person routes
const personRoute = require('./jwt/person.routes');
app.use('/jwt', personRoute);

// listen for requests
app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});