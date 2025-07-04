const { addTodo } = require("../repository/todo");

const todoService = (repository) => {
  return {
    getTodos: async () => {
      return await repository.getTodos();
    },
    addTodo: async (task) => {
      const newTodo = { task };
      return await repository.addTodo(newTodo);
    },
  };
};

module.exports = todoService;
