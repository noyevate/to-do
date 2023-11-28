require('dotenv').config()

const express = require('express')

const app = express.Router()
const jwt = require("jsonwebtoken")
const { models: { User } } = require('../models');
//const {models : {Todo} } = require('../models');


app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = await User.create({ username, password });
        console.log('User signed up:', newUser);
        return res.status(200).json(newUser);
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username, password } });

        if (user && password === user.password) {
            console.log('User logged in:', user);

            const payload = { username: user.username };
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '100000000s' });

            res.status(200).json( accessToken);
        } else {
            res.status(401).send('Unauthorized');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
});





module.exports = app