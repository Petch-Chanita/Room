const express = require('express')
const routes = express.Router();
const User = require('../data');


routes.get('/', (req, res) => {
    res.send({'api': 'users'});
});
// ------------------------------------------------------- Get user all -----------------------------------------------------------------------------------------------------------------------
routes.get('/userall', async (req, res) => {
    var uses = await User.find({}); 
    res.json(uses)
})

// ------------------------------------------------------- get username all  -----------------------------------------------------------------------------------------------------------------------
routes.get('/usersList', function (req, res) {
    User.find({}, function (err, users) {
        var userMap = {};

        users.forEach(function (user) {
            userMap[user.username] = user.username;
        });

        res.send(userMap);
    });
});

// ------------------------------------------------------- get email someone  -----------------------------------------------------------------------------------------------------------------------
routes.get('/useremail/:email', async (req, res) => {
    try {
        var person = await User.find({ email: req.params.email}).exec()
        console.log(req.params.email);
        res.send(person)
    } catch (error) {
        res.status(500).send(error)
    }
})
// ------------------------------------------------------- show somebody username  -----------------------------------------------------------------------------------------------------------------------
routes.get('/username/:username', async (req, res) => {
    try {
        var person = await User.find({ username:  req.params.username}).exec()
        res.send(person)
    } catch (error) {
        res.status(500).send(error)
    }
})

// ------------------------------------------------------- show somebody username ใช้ในsearch ได้ -----------------------------------------------------------------------------------------------------------------------
routes.get('/usersearch/:username', async (req, res) => {
    try {
        var person = await User.find({ username: { "$regex": req.params.username, "$options": "i" } }).exec()
        res.send(person)
    } catch (error) {
        res.status(500).send(error)
    }
})

//-------------------------------------------------------- show somebody user ---------------------------------------------------------------------------------------------------------------------------
routes.get('/user/:_id', async (req, res) => {
    try {
        var person = await User.findById(req.params._id).exec()
        res.send(person)
    } catch (error) {
        res.status(500).send(error)
    }
})
// ------------------------------------------------------- Update User -----------------------------------------------------------------------------------------------------------------------
routes.post('/user/:_id', function (req, res) {

    User.findByIdAndUpdate(
        req.params._id,
        {
            email: req.body.email,
            username: req.body.username,
            Image: req.body.Image
        },
        {
            new: true
        },
        (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    message: err
                })
            } else if (!data) {
                res.json({
                    success: false,
                    message: "Not Found"
                })
            } else {
                res.json({
                    success: true,
                    data: data
                })
            }
        }
    )
})
module.exports = routes;