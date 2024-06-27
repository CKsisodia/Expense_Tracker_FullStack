import ApiHelper from "../../utils/apiHelperFunction";
import { toast } from "react-toastify";

class ExpenseApiServices {
  static getInstance() {
    return new ExpenseApiServices();
  }

  addExpense = async (formData) => {
    try {
      const response = await ApiHelper.post("/expense/add-expense", formData);
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };
  getAllExpense = async () => {
    try {
      const response = await ApiHelper.get("/expense/expense-list");
      return response?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  deleteExpense = async (expenseId) => {
    try {
      const response = await ApiHelper.delete(`/expense/${expenseId}`);
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };
}

export const expenseApiServices = ExpenseApiServices.getInstance();