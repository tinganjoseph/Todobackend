const Todo = require('../models/todo.model');

// Controller function to handle errors and logic for creating a new TODO item
const createTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const todo = new Todo({
      title,
      description,
      completed,
    });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    console.error('Error creating todo:', err);
    res.status(500).json({ error: 'Error creating todo' });
  }
};

// Controller function to handle errors and logic for getting all TODO items
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.json(todos);
  } catch (err) {
    console.error('Error getting todos:', err);
    res.status(500).json({ error: 'Error getting todos' });
  }
};

// Controller function to handle errors and logic for updating a TODO item by ID
const updateTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        title,
        description,
        completed,
        updatedAt: Date.now(), // Update the 'updatedAt' field
      },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(updatedTodo);
  } catch (err) {
    console.error('Error updating todo:', err);
    res.status(500).json({ error: 'Error updating todo' });
  }
};

// Controller function to handle errors and logic for deleting a TODO item by ID
const deleteTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ error: 'Error deleting todo' });
  }
};
const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (err) {
    console.error('Error getting todo by ID:', err);
    res.status(500).json({ error: 'Error getting todo by ID' });
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  updateTodoById,
  deleteTodoById,
  getTodoById
};
