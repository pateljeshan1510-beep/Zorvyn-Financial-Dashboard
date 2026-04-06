import TransactionCategory from "../models/TransactionCategory.js";

const transactionCategoryController = {
    getAllTransactionCategories: async (req, res) => {
        try {
            const transactionCategories = await TransactionCategory.findAll();

            res.json(transactionCategories);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getTransactionCategoryById: async (req, res) => {
        try {
            const categoryId = req.params.id;
            const transactionCategory = await TransactionCategory.findById(categoryId);

            if(!transactionCategory) {
                return res.status(404).json({ message: 'Transaction Category not found' });
            }

            res.json(transactionCategory);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createTransactionCategory: async (req, res) => {
        try {
            const { Category, Status, Type } = req.body;
            const newTransactionCategory = new TransactionCategory(null, Category, Status, Type, null);
            const result = await TransactionCategory.create(newTransactionCategory);

            res.status(201).json({ message: 'Transaction Category created successfully', categoryId: result.insertId });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateTransactionCategory: async (req, res) => {
        try {
            const categoryId = req.params.id;
            const { Category, Status, Type } = req.body;

            const transactionCategory = new TransactionCategory(categoryId, Category, Status, Type, null);
            const result = await TransactionCategory.update(categoryId, transactionCategory);

            res.json({ message: 'Transaction Category updated successfully', categoryId: result.affectedRows });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    removeTransactionCategory: async (req, res) => {
        try {
            const categoryId = req.params.id;
            const result = await TransactionCategory.delete(categoryId);
            
            res.json({ message: 'Transaction Category deleted successfully', categoryId: result.affectedRows });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default transactionCategoryController;