let todoList = {
  todos: [
    {
      task: "This is a todo example",
    },
  ],
};

module.exports = {
  getTodos: () => Promise.resolve(todoList),

  addTodo: (newTodo) => {
    todoList.todos.push(newTodo);
    return Promise.resolve(newTodo);
  },
};
