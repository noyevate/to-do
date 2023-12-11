require('dotenv').config()
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { User } = require('../models/todo_user');

router.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(username, password);
      console.log(User)
      const newUser = await User.create({ username, password });
      console.log('User signed up:', newUser);
      return res.status(200).json({message: 'user account created'})
    } catch (error) {
      console.error('Error signing up:', error);
      res.status(500).json(error);
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = req.body;
        const existingUser = await User.findOne({ where: { email: user.email } });

        if (!existingUser || existingUser.password !== user.password) {
            return res.status(401).json({
                message: "Incorrect username and password"
            });
        } else {
            const accessToken = jwt.sign(
                { email: existingUser.email, role: existingUser.role },
                process.env.ACCESS_TOKEN,
                { expiresIn: "20000h" }
            );

            return res.status(200).json({
                message: "Successfully logged in",
                accessToken: accessToken
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});

module.exports = router;
