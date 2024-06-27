import { createSlice } from "@reduxjs/toolkit";
import {
  addExpenseAction,
  deleteExpenseAction,
  getAllExpenseAction,
} from "../actions/asyncExpenseAction";

const initialState = {
  expenseData: [],
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addExpenseAction.fulfilled, (state, action) => {
      const response = action.payload;
      console.log(response);
    });
    builder.addCase(getAllExpenseAction.fulfilled, (state, action) => {
      const response = action.payload;
      state.expenseData = response;
      console.log(response);
    });
    builder.addCase(deleteExpenseAction.fulfilled, (state, action) => {
      const response = action.payload;
      console.log(response);
    });
  },
});

export default expenseSlice.reducer;
// export const expenseAction = expenseSlice.actions;

export const selectExpenseData = (state) => state.expense.expenseData;
