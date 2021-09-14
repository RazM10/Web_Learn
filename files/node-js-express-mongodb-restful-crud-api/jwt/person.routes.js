const express = require('express');
const router = express.Router();
const Person = require('./person.model');

const config = require('./config');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');

//home page
router.get('/home', middleware.checkToken, async (req, res) => {
    res.send('Now we are in Jwt home page.');
});

// reqistration person
router.post('/registration', async (req, res) => {
    // Initialize a person
    const person = new Person({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    });

    person.save()
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'some error occured while registration.'
        });
    });
});

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

router.put("/update/:name", middleware.checkToken, async (req, res) => {
    Person.findOneAndUpdate(
        {name: req.params.name},
        {$set: {password: req.body.password}},
        (err, result) => {
            if(err) return res.status(500).json({msg: err});
            const msg = {
                msg: "password successfully updated",
                name: req.params.name,
            };
            return res.json(msg);
        }
    );
});

module.exports = router;