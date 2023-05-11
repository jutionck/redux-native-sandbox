import pkg from "@reduxjs/toolkit";
const { configureStore } = pkg;
import TodosReducer from "./Todo/TodoReducer.js";
import GoalsReducer from "./Goal/GoalReducer.js";
import {
  addTodoActionCreator,
  removeTodoActionCreator,
  toggleTodoActionCreator,
} from "./Todo/TodoSlice.js";
import {
  addGoalActionCreator,
  deleteGoalActionCreator,
} from "./Goal/GoalSlice.js";

// consume
const store = configureStore({
  reducer: {
    todos: TodosReducer,
    goals: GoalsReducer,
  },
});

// getting the state
store.getState();

// subscribe state changed
store.subscribe(() => {
  console.log("state changed!", store.getState());
});

// Todo
store.dispatch(
  addTodoActionCreator({
    id: 1,
    name: "Learn React",
  })
);

store.dispatch(
  addTodoActionCreator({
    id: 2,
    name: "Learn Redux",
  })
);

store.dispatch(
  addTodoActionCreator({
    id: 3,
    name: "Learn JavaScript",
  })
);

// menghapus todo dengan id 3
store.dispatch(removeTodoActionCreator({ id: 3 }));

// mengubah Learn React menjadi complete
store.dispatch(toggleTodoActionCreator({ id: 1 }));

// Goal
store.dispatch(
  addGoalActionCreator({
    id: 1,
    text: "Get a Doctorate",
  })
);

store.dispatch(
  addGoalActionCreator({
    id: 2,
    text: "Be an Entrepreneur",
  })
);

// menghapus goal dengan id 1
store.dispatch(deleteGoalActionCreator({ id: 1 }));
