const express = require("express");
const cors = require("cors");
const repository = require("./repository/todo");
const todoService = require("./service/todo")(repository);

const server = () => {
  const server = express();
  server.use(express.json());
  server.use(cors());

  server.get("/api/todo", async (req, res) => {
    try {
      const data = await todoService.getTodos();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  server.post("/api/todo", async (req, res) => {
    const { task } = req.body;

    if (!task || task.trim() === "") {
      return res.status(400).json({ error: "Task is required" });
    }
    try {
      const newTodo = await todoService.addTodo(task);
      res.status(201).json(newTodo);
    } catch (error) {
      console.error("Error adding todo:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return server;
};
module.exports = server;
