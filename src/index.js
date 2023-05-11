import {
  addTodoActionCreator,
  removeTodoActionCreator,
  toggleTodoActionCreator,
} from "./Action.js";
import { createStore } from "./CreateStore.js";
import { todosReducer } from "./Reducer.js";

// consume
const store = createStore(todosReducer);

// getting the state
store.getState();

// subscribe state changed
store.subscribe(() => {
  console.log("state changed!", store.getState());
});

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
