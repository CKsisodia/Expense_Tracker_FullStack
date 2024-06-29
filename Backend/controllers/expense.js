const Expense = require("../models/expense");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

exports.addExpense = async (req, res) => {
  try {
    const { description, amount, category } = req.body;
    const userId = req.user.id;
    if (!(description && amount && category)) {
      return res.status(400).json(new ApiError("All fiels are mandatory"));
    }
    const createExpense = await Expense.create({
      description,
      amount,
      category,
      userId,
    });
    return res
      .status(201)
      .json(new ApiResponse("New expense created succesfully", createExpense));
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message).join(", ");
      return res.status(400).json(new ApiError(errorMessage));
    }
    return res.status(500).json("Internal server error");
  }
};
exports.getAllExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const getAllExpenseData = await Expense.findAll({
      where: { userId },
    });

    if (!getAllExpenseData) {
      res.status(500).json(new ApiError("Something went wrong"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse("Get all expenses successfully", getAllExpenseData)
      );
  } catch (error) {
    return res.status(500).json(new ApiError("Internal server error"));
  }
};
exports.deleteExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const { expenseId } = req.params;

    const expense = await Expense.findByPk(expenseId);
    if (!expense) {
      res.status(400).json(new ApiError("Expense not found"));
    }

    const deletedExpense = await Expense.destroy({
      where: { id: expenseId, userId },
    });

    return res
      .status(200)
      .json(new ApiResponse("Expense deleted successfully", deletedExpense));
  } catch (error) {
    return res.status(500).json(new ApiError("Internal server error"));
  }
};
exports.updateExpense = async (req, res) => {
  try {
    const { updateDescription, updateAmount, updateCategory } = req.body;
    const { expenseId } = req.params;
    const userId = req.user.id;

    if (!(updateDescription && updateAmount && updateCategory && expenseId)) {
      return res
        .status(400)
        .json(new ApiError("All fields are mandatory with expenseId"));
    }

    const expense = await Expense.findOne({
      where: { id: expenseId, userId: userId },
    });
    if (!expense) {
      return res.status(404).json(new ApiError("Expense not found"));
    }

    expense.description = updateDescription || expense.description;
    expense.amount = updateAmount || expense.amount;
    expense.category = updateCategory || expense.category;
    await expense.save();

    return res
      .status(200)
      .json(new ApiResponse("Expense updated !", { expense }));
  } catch (error) {
    return res.status(500).json(new ApiError("Internal server error"));
  }
};
