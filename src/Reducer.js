function todosReducer(todos = [], action = {}) {
  if (action.type === "ADD_TODO") {
    return [...todos, action.payload];
  }

  if (action.type === "TOGGLE_TODO") {
    return todos.map((todo) => {
      if (todo.id === action.payload.id) {
        return { ...todo, complete: !todo.complete };
      }

      return todo;
    });
  }

  if (action.type === "REMOVE_TODO") {
    return todos.filter(({ id }) => id !== action.payload.id);
  }

  return todos;
}

export { todosReducer };
