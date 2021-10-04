const express = require('express')
const routes = express.Router();
const User = require('../data');
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

routes.get('/', (req, res) => {
    res.send({'api': 'authen'});
});

routes.post('/login', async (req, res,) => {
    const { username, password } = req.body
    const user = await User.findOne({ username }).lean()
    if (!user) {
        return res.status(400).json({ status: 'error',
         error: 'Invaild username/password',username,password })
    }
    bcrypt.compare(password, user.password).then((result) => {
        // ทำแบบอนาคต
        if (result) {   
            const token = jwt.sign({
                id: user._id,
                username: user.username
            }, JWT_SECRET)

            return res.status(200).json({ _id: user._id, data: token })

        } else {
            return res.status(400).json({  status: 'error', error: 'Invaild username/password',username,password })
        }
    });
})

// ------------------------------------------------------- register -----------------------------------------------------------------------------------------------------------------------
routes.post('/register',  async (req, res) => {
    const errors = validationResult(req)
    const { email, password: plainTextPassword, username, Image } = req.body

    if (!errors.isEmpty()) {
        return res.send(signupTemplet({ errors }))
    }
    if (!email || typeof email !== 'string') {
        return res.status(401).json({ error: 'Invalid email' })
    }
    if (!username || typeof username !== 'string') {
        return res.status(402).json({ error: 'Invalid username' })
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.status(403).json({ error: 'Invalid password' })
    }
    if (!Image || typeof Image !== 'string') {
        return res.status(404).json({ error: 'Invalid Image' })
    }

    if (plainTextPassword.length < 5) {
        return res.status(201).json({
            data: 'Password error',
            error: 'Password too small. Should be atleast 5 character'
        })
    }
    const password = await bcrypt.hash(plainTextPassword, 10) 
    try {
        await User.create({
            email,
            password,
            username,
            Image

        })
    } catch (error) {

        return res.status(400).json()
    }
    res.status(200).json({ email, username, Image, message: "Data saved successfully." })

})

// ------------------------------------------------------- register msu -----------------------------------------------------------------------------------------------------------------------
routes.post('/register/msu', async (req, res) => {
    const { email, password: plainTextPassword, username, Image } = req.body
    const password = await bcrypt.hash(plainTextPassword, 10) //รอก่อนทำ

    try {
        await User.create({
            email,
            password,
            username,
            Image


        })
    } catch (error) {

        return res.status(400).json()
    }
    res.status(200).json({ email, username, Image,message: "Data saved successfully."  })

})

module.exports = routes;