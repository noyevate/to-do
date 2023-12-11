require("dotenv").config()
const express = require("express")
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./database');
const bodyParser = require('body-parser');

// Sequelize sync to create tables
sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
});

const port = 8080
const connection = require("./connection");

const get_api = require("./apis/get_todos");
const add_task = require("./apis/add_task_api")
const user = require("./apis/user");
const edit_todos = require('./apis/edit_todos')
const delete_todo = require("./apis/delete_todo")
const completed_todo = require('./apis/completed_todo')


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/get', get_api)
app.use('/user', user)
app.use('/add', add_task)
app.use('/edit_todo', edit_todos)
app.use("/delete", delete_todo)
app.use('/completed_todo', completed_todo)
app.use(bodyParser.urlencoded({ extended: true }));





app.listen(port, () =>{
    console.log('port is running at: ', port)
})