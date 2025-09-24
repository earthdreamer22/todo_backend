const { Router } = require('express');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');

const router = Router();

router.get('/', getTodos);
router.post('/', createTodo);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
