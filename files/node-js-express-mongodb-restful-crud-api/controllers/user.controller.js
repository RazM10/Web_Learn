const User = require('../models/user.model');

// create and save a new user
exports.create = (req, res) => {
    // validate request
    if(!req.body.address) {
        return res.status(400).send({
            message: "user address can not be empty"
        });
    }

    // create a user
    const user = new User({
        name: req.body.name || "Untitled User",
        role: req.body.role,
        address: req.body.address
    });

    // save user in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "some error occurred while creating the user."
        });
    });
};

// retrieve and return all users from datavase.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err =>  {
        res.status(500).send({
            message: err.message || "some error occurred while rettieving users."
        });
    });
};

// find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "error retriving user with id " + req.params.userId
        });
    });
};

// update a user identified by userId in the request
exports.update = (req, res) => {
    //validate request
    if(!req.body.address) {
        return res.status(400).send({
            message: "user address can not be empty"
        });
    }

    //find user and update it with the body
    User.findByIdAndUpdate(req.params.userId, {
        name: req.body.name || "Untitled User",
        address: req.body.address
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "error updating user with id " + req.params.userId
        });
    });
};

// delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndDelete(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send({message: "user delete successfully"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === "NotFound") {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "could not found with id "+req.params.userId
        });
    });
};