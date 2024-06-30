import { createSlice } from "@reduxjs/toolkit";
import { getAllExpenseAction , getLeaderboardAction} from "../actions/asyncExpenseAction";

const initialState = {
  expenseData: [],
  leaderBoardData: [],
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllExpenseAction.fulfilled, (state, action) => {
      const response = action.payload;
      state.expenseData = response;
    });
    builder.addCase(getLeaderboardAction.fulfilled, (state, action) => {
      const response = action.payload;
      state.leaderBoardData = response;
    });
  },
});

export default expenseSlice.reducer;
// export const expenseAction = expenseSlice.actions;

export const selectExpenseData = (state) => state.expense.expenseData;
export const selectLeaderBoardData = (state) => state.expense.leaderBoardData;
