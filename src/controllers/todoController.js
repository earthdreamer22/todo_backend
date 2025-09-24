const Todo = require('../model/Todo');

async function getTodos(req, res, next) {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    next(error);
  }
}

async function createTodo(req, res, next) {
  try {
    const { text, priority = 'medium', dueDate } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ message: '할 일 내용(text)은 필수입니다.' });
    }

    const todo = await Todo.create({
      text: text.trim(),
      priority,
      dueDate: parseDueDate(dueDate),
    });

    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
}

async function updateTodo(req, res, next) {
  try {
    const { id } = req.params;
    const { text, priority, dueDate, completed } = req.body;

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (typeof text === 'string') {
      if (text.trim().length === 0) {
        return res.status(400).json({ message: '할 일 내용(text)은 비워둘 수 없습니다.' });
      }
      todo.text = text.trim();
    }

    if (typeof priority === 'string') {
      todo.priority = priority;
    }

    if (typeof dueDate !== 'undefined') {
      todo.dueDate = parseDueDate(dueDate);
    }

    if (typeof completed === 'boolean') {
      todo.completed = completed;
      todo.completedAt = completed ? new Date() : null;
    }

    await todo.save();
    res.json(todo);
  } catch (error) {
    next(error);
  }
}

async function deleteTodo(req, res, next) {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

function parseDueDate(value) {
  if (value === undefined) {
    return undefined;
  }

  if (value === null || value === '') {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
