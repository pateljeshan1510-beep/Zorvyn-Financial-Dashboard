import Transactions from "../models/Transactions.js";
import TransactionCategory from "../models/TransactionCategory.js";
import User from "../models/User.js";

const transactionsController = {
    getAllTransactions: async (req, res) => {
        try {
            const transactions = await Transactions.findAll();
            res.json(transactions);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getTransactionsByType: async (req, res) => {
        try {
            const type = req.params.type;
            const transactions = await Transactions.findByType(type);
            res.json(transactions);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getTransactionsByCategory: async (req, res) => {
        try {
            const categoryId = req.params.categoryId;
            const transactions = await Transactions.findByCategory(categoryId);
            res.json(transactions);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getTransactionsByDateRange: async (req, res) => {
        try {
            const { startDate, endDate } = req.query;
            const transactions = await Transactions.findByDateRange(startDate, endDate);
            res.json(transactions);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getTransactionsByUser: async (req, res) => {
        try {
            const userId = req.params.userId;
            const transactions = await Transactions.findByUser(userId);
            res.json(transactions);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createTransaction: async (req, res) => {
        try {
            console.log("Create Request called!");
            const { Category, Username, Amount, Status, Description, Date } = req.body;
            
            const category = await TransactionCategory.findByName(Category);
            const user = await User.findByName(Username);
            console.log("Category found: ", category);
            console.log("User found: ", user);

            const newTransaction = new Transactions(null, category.ID, user.UserID, Amount, Status, Description, null, null);
            const result = await Transactions.create(newTransaction);
            res.status(201).json({ message: 'Transaction created successfully', transactionId: result.insertId });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateTransaction: async (req, res) => {
        try {
            console.log("Update Request called!");
            const transactionId = req.params.id;
            const { CategoryID, UserID, TransactionAmount, Status, TransactionNote, TransactionDate } = req.body;
            console.log(req.body);
            const transaction = new Transactions(transactionId, CategoryID, UserID, TransactionAmount, Status, TransactionNote, TransactionDate, null);
            const result = await Transactions.update(transactionId, transaction);
            res.json({ message: 'Transaction updated successfully', transactionId: result.affectedRows });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    removeTransaction: async (req, res) => {
        try {
            const transactionId = req.params.id;
            const result = await Transactions.delete(transactionId);
            res.json({ message: 'Transaction deleted successfully', transactionId: result.affectedRows });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default transactionsController;
