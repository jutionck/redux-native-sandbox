function addTodoActionCreator({ id, name }) {
  return {
    type: "ADD_TODO",
    payload: {
      id,
      name,
      complete: false,
    },
  };
}

function toggleTodoActionCreator(id) {
  return {
    type: "TOGGLE_TODO",
    payload: {
      id,
    },
  };
}

function removeTodoActionCreator(id) {
  return {
    type: "REMOVE_TODO",
    payload: {
      id,
    },
  };
}

export {
  addTodoActionCreator,
  toggleTodoActionCreator,
  removeTodoActionCreator,
};
