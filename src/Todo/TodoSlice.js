import pkg from "@reduxjs/toolkit";
const { createSlice } = pkg;

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodoActionCreator: (state, action) => {
      state.push({
        id: action.payload.id,
        name: action.payload.name,
        completed: false,
      });
    },
    toggleTodoActionCreator: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      todo.completed = !todo.completed;
    },
    removeTodoActionCreator: (state, action) => {
      return state.filter(({ id }) => id !== action.payload.id);
    },
  },
});

export const {
  addTodoActionCreator,
  toggleTodoActionCreator,
  removeTodoActionCreator,
} = todosSlice.actions;
export { todosSlice };
