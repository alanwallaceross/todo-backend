import express from "express";
const router = express.Router();
import pool from "../elephantsql";
import { v4 } from "uuid";

async function getTodos() {
  const { rows: todos } = await pool.query("SELECT * FROM todos");

  const { rows: subtasks } = await pool.query(
    'SELECT * FROM todos JOIN subtasks ON "todos".todo_id = "subtasks".todo_id'
  );

  const mergeTodosWithSubtasks = (todos = [], subtasks = []) => {
    let arrayOfTodoIds = [];
    let arrayOfTodosWithSubtasks = [];
    arrayOfTodoIds = todos.map(({ todo_id }) => {
      return todo_id;
    });
    arrayOfTodoIds.forEach((todo_id) => {
      let matchingTodo = todos.find((todo) => todo.todo_id === todo_id);
      let matchingSubtasks = subtasks.filter(
        (subtask) => subtask.todo_id === todo_id
      );
      matchingTodo.subtasks = matchingSubtasks;
      arrayOfTodosWithSubtasks.push(matchingTodo);
    });
    return arrayOfTodosWithSubtasks;
  };

  const mergedTodos = mergeTodosWithSubtasks(todos, subtasks);
  return mergedTodos;
}

router.get("/", async (req, res) => {
  const todos = await getTodos();
  res.json({
    todos,
  });
});

router.post("/", async (req, res) => {
  const currentTime = new Date().toUTCString();
  const newId = v4();
  const queryValues = [
    newId,
    req.body.title,
    "pending",
    currentTime,
    currentTime,
  ];
  const queryText =
    'INSERT INTO todos(todo_id, title, status, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5)';
  try {
    await pool.query(queryText, queryValues);
  } catch (err) {
    console.log(err.stack);
  }

  const response = await getTodos();
  const newTodo = response.find((todo) => todo.todo_id === newId);
  res.json(newTodo);
});

export default router;
