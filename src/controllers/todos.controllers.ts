import type { Request, Response } from 'express';
import { TodoModels } from '../models/todos.models';
import { Todo } from '../types/todos';

const getTodos = (_: Request, res: Response) => {
  TodoModels.selectTodos()
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        throw new Error("Could not get TO-DO's from the database.");
      }
    })
    .catch((err: Error) => {
      res.status(500).json({ error: err.message });
    });
};

const getOneTodo = (req: Request, res: Response) => {
  TodoModels.selectOneTodo(req.params.id)
    .then((result) => {
      if (result) {
        if (result.length === 0) {
          res
            .status(404)
            .json({ message: `There's no todo with ID (${req.params.id}).` });
        } else {
          res.json(result);
        }
      } else {
        throw new Error('Could not get TO-DO from the database.');
      }
    })
    .catch((err: Error) => {
      res.status(500).json({ error: err.message });
    });
};

const createTodo = (req: Request, res: Response) => {
  TodoModels.insertTodo(req.body as Todo)
    .then((result) => {
      if (result) {
        const { affectedRows, insertId } = result;
        if (affectedRows === 1) {
          res.json({
            message: `A new todo has been created with ID (${insertId}).`,
          });
        }
      } else {
        throw new Error('Could not create TO-DO.');
      }
    })
    .catch((err: Error) => {
      res.status(500).json({ error: err.message });
    });
};

const updateTodo = (req: Request, res: Response) => {
  TodoModels.updateTodo(req.body as Todo, req.params.id as Todo['id'])
    .then((result) => {
      if (result) {
        const { affectedRows } = result;
        if (affectedRows === 1) {
          res.json({
            message: `A todo with ID (${req.params.id}) has been updated.`,
          });
        } else {
          res.status(404).json({
            message: `There's no todo with ID (${req.params.id}).`,
          });
        }
      } else {
        throw new Error('Could not update TO-DO.');
      }
    })
    .catch((err: Error) => {
      res.status(500).json({ error: err.message });
    });
};

const deleteTodo = (req: Request, res: Response) => {
  TodoModels.deleteTodo(req.params.id as Todo['id'])
    .then((result) => {
      if (result) {
        const { affectedRows } = result;
        if (affectedRows === 1) {
          res.json({
            message: `A todo with ID (${req.params.id}) has been deleted.`,
          });
        } else {
          res.status(404).json({
            message: `There's no todo with ID (${req.params.id}).`,
          });
        }
      } else {
        throw new Error('Could not delete TO-DO.');
      }
    })
    .catch((err: Error) => {
      res.status(500).json({ error: err.message });
    });
};

export const TodoController = {
  getTodos,
  getOneTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
