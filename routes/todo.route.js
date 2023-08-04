const express = require('express');
const router = express.Router();
const todo = require('../controllers/todo.controller');


// Route to create a new TODO item
router.post('/', todo.createTodo);

//Get all
router.get('/',todo.getAllTodos);

// Route to update a TODO item by ID
router.put('/:id',todo.updateTodoById);

// Route to get a TODO item by ID
router.get('/:id',todo.getTodoById);

// Route to delete a TODO item by ID
router.delete('/:id',todo.deleteTodoById)


module.exports = router;
