import pkg from "@reduxjs/toolkit";
const { createSlice } = pkg;

const goalsSlice = createSlice({
  name: "goals",
  initialState: [],
  reducers: {
    addGoalActionCreator: (state, action) => {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
      });
    },
    deleteGoalActionCreator: (state, action) => {
      return state.filter(({ id }) => id !== action.payload.id);
    },
  },
});

export const { addGoalActionCreator, deleteGoalActionCreator } =
  goalsSlice.actions;
export { goalsSlice };
