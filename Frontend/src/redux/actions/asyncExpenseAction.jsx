import { createAsyncThunk } from "@reduxjs/toolkit";
import { expenseApiServices } from "../services/expenseApiService";

export const addExpenseAction = createAsyncThunk(
  "addExpenseAction",
  async (formData) => {
    const response = await expenseApiServices.addExpense(formData);
    return response;
  }
);
export const getAllExpenseAction = createAsyncThunk(
  "getAllExpenseAction",
  async () => {
    const response = await expenseApiServices.getAllExpense();
    return response;
  }
);
export const deleteExpenseAction = createAsyncThunk(
  "deleteExpenseAction",
  async (expenseId, thunkAPI) => {
    const response = await expenseApiServices.deleteExpense(expenseId);
    if (response) {
      thunkAPI.dispatch(getAllExpenseAction());
    }
    return response;
  }
);
export const updateExpenseAction = createAsyncThunk(
  "updateExpenseAction",
  async (updatedExpenseData, thunkAPI) => {
    const response = await expenseApiServices.updateExpense(updatedExpenseData);
    if (response) {
      thunkAPI.dispatch(getAllExpenseAction());
    }
    return response;
  }
);
