const express = require('express');
const { authenticateJwt, SECRET } = require("../middleware/index");
const { Todo } = require("../db");
import { Request ,Response } from "express";
const router = express.Router();

interface IGETUSERID extends Request {
  userId : string;
}
interface TODO {
  title : string;
  description : string | null;
  done : boolean;
  userId : string ;
}

router.post('/todos', authenticateJwt, (req: IGETUSERID, res: Response) => {
  const { title, description } = req.body;
  const done = false;
  const userId = req.userId;

  const newTodo = new Todo({ title, description, done, userId });

  newTodo.save()
    .then((savedTodo: TODO) => {
      res.status(201).json(savedTodo);
    })
    .catch((err:any) => {
      res.status(500).json({ error: 'Failed to create a new todo' });
    });
});


router.get('/todos', authenticateJwt, (req: IGETUSERID, res: Response) => {
  const userId = req.userId;

  Todo.find({ userId })
    .then((todos:TODO) => {
      res.json(todos);
    })
    .catch((err:any) => {
      res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});

router.patch('/todos/:todoId/done', authenticateJwt, (req: IGETUSERID, res: Response) => {
  const { todoId } = req.params;
  const userId = req.userId;

  Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
    .then((updatedTodo:TODO) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(updatedTodo);
    })
    .catch((err:any) => {
      res.status(500).json({ error: 'Failed to update todo' });
    });
});

export default router;
// module.exports = router;