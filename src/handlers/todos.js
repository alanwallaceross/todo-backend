const express = require("express");
const router = express.Router();
import client from "../elephantsql";

router.get("/", async (req, res) => {
  const { rows: todos } = await client.query("SELECT * FROM todos");

  const { rows: subtasks } = await client.query(
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

  console.log("todos:", mergedTodos);
  res.json({
    todos: mergedTodos,
  });
});

export default router;
