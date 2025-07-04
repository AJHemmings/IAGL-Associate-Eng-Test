import React, { Component } from "react";
import Todo from "./Todo";
import { addTodo, fetchTodos } from "../actions";
import { connect } from "react-redux";

class TodoList extends Component {
  state = { task: "" };

  componentDidMount() {
    this.props.fetchTodos();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.task.trim()) return;
    this.props.addTodo(this.state.task);
    this.setState({ task: "" });
  };

  render() {
    const { data = { todos: [] }, isLoadingData } = this.props;
    const { todos } = data;

    return (
      <div>
        <form onSubmit={this.handleSubmit} style={{ marginBottom: "20px" }}>
          <input
            value={this.state.task}
            onChange={(e) => this.setState({ task: e.target.value })}
            placeholder="Add new task"
          />
          <button type="Submit">Add</button>
        </form>
        <ul className="todo-list">
          {todos && todos.length
            ? todos.map((todo, index) => {
                return <Todo key={`todo-${index}`} todo={todo.task} />;
              })
            : "No todos, yay!"}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ data = {}, isLoadingData = false }) => ({
  data,
  isLoadingData,
});
export default connect(mapStateToProps, {
  fetchTodos,
  addTodo,
})(TodoList);
