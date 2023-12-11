require('dotenv').config()

const express = require('express')

const app = express.Router()
const {models : {Todo} } = require('../models');
var auth = require('../Authentication/authentication')

//add

app.post('/add', auth.authenticateToken, async (req, res) => {
    try {
      const { title, description } = req.body;
      const newTodo = await Todo.create({ title, description });
      console.log('todo added to the database', newTodo);
      return res.status(200).json({message : "todo added", newTodo})
    } catch (error) {
      console.error('Error adding todo:', error);
      res.status(500).send('Internal Server Error');
    }
});

//list out
app.get('/display', auth.authenticateToken, async (req, res) => {
    try {
      const todos = await Todo.findAll();
      return res.status(200).json({message : "todo list", todos})
    } catch (error) {
      console.error('Error fetching to-do list:', error);
      res.status(500).send('Internal Server Error');
    }
});

///get by id
app.get('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    console.log(todo)
    return res.status(200).json(todo)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// getting the todo to be edited
app.get('/edit/:todoId', auth.authenticateToken, async (req, res) => {
    try {
      const todoId = req.params.todoId;
      const todo = await Todo.findByPk(todoId);
      if(!todo){
        res.status(404).json({message: "id nodt found"})
      }
      return res.status(200).json({message : "todos", title, description})
    } catch (error) {
      console.error('Error rendering edit form:', error);
      res.status(500).send('Internal Server Error');
    }
});


//edit
app.patch('/edit/:todoId', auth.authenticateToken, async (req, res) => {
    try {
      const todoId = req.params.todoId;
      const { title, description } = req.body;
      const updatedTodo = await Todo.update({ title, description }, { where: { id: todoId } });
      if(!updatedTodo){
        res.status(404).json({message: "id nodt found"})
      }
      console.log('todo edited in the database');
      return res.status(200).json({message : "todo edited", title, description})
    } catch (error) {
      console.error('Error editing todo:', error);
      res.status(500).send('Internal Server Error');
    }
});

//delete
app.delete('/delete/:todoId', auth.authenticateToken, async (req, res) => {
    try {
      const todoId = req.params.todoId;
      const deletedTodo = await Todo.destroy({ where: { id: todoId } });
      if(!deletedTodo){
        res.status(404).json({message: "id nodt found"})
      }
      console.log('todo deleted from the database');
      return res.status(200).json({message : "todo deleted", })
    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).send('Internal Server Error');
    }
});

// mark complete

app.patch('/complete/:todoId', auth.authenticateToken, async (req, res) => {
    try {
      const todoId = req.params.todoId;
      const updatedTodo = await Todo.update({ completed: true }, { where: { id: todoId } });
      console.log('todo marked as complete in the database');
      if(!updatedTodo){
        res.status(404).json({message: "id nodt found"})
      }
      return res.status(200).json({message : "todo completed", updatedTodo})
    } catch (error) {
      console.error('Error marking todo as complete:', error);
      res.status(500).send('Internal Server Error');
    }
});

// pagination
app.get('/todos/:page/:pageSize', async (req, res) => {
  const { page, pageSize } = req.params;
  const offset = (page - 1) * pageSize;

  try {
    const todos = await Todo.findAll({ offset, limit: parseInt(pageSize) });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = app