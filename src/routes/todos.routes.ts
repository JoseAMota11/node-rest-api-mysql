import { Router } from 'express';
import { TodoController } from '../controllers/todos.controllers';
import { validateTodo } from '../middleware/todos.validations';

const route = Router();

// Routes
route.get('/', TodoController.getTodos);
route.get('/:id', TodoController.getOneTodo);
route.post('/', validateTodo, TodoController.createTodo);
route.put('/:id', validateTodo, TodoController.updateTodo);
route.delete('/:id', TodoController.deleteTodo);

export default route;
