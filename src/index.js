import {
  addGoalActionCreator,
  deleteGoalActionCreator,
} from "./Goal/GoalAction.js";
import { rootReducer } from "./RootReducer.js";
import { createStore } from "./Store.js";
import {
  addTodoActionCreator,
  removeTodoActionCreator,
  toggleTodoActionCreator,
} from "./Todo/TodoAction.js";

// consume
const store = createStore(rootReducer);

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
store.dispatch(removeTodoActionCreator(3));

// mengubah Learn React menjadi complete
store.dispatch(toggleTodoActionCreator(1));

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

store.dispatch(deleteGoalActionCreator(1));
