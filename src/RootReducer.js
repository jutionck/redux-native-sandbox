import { goalsReducer } from "./Goal/GoalReducer.js";
import { todosReducer } from "./Todo/TodoReducer.js";

function rootReducer(state = {}, action = {}) {
  return {
    todos: todosReducer(state.todos, action),
    goals: goalsReducer(state.goals, action),
  };
}

export { rootReducer };
