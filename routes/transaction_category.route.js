import express from "express";
import transactionCategoryController from "../controllers/transaction_category.controller.js";
import userController from "../controllers/user.controller.js";
const router = express.Router();

// Get All Transaction Categories API access by All User Types
router.get('/', userController.verifyToken, transactionCategoryController.getAllTransactionCategories);

// Get Transaction Category by ID API access by All User Types
router.get('/:id', userController.verifyToken, transactionCategoryController.getTransactionCategoryById);

// Create Transaction Category API access by Admin Users Only
router.post('/create', userController.verifyToken, userController.isUserAdmin, transactionCategoryController.createTransactionCategory);

// Update Transaction Category API access by Admin Users Only
router.put('/update/:id', userController.verifyToken, userController.isUserAdmin, transactionCategoryController.updateTransactionCategory);

// Delete Transaction Category API access by Admin Users Only
router.delete('/delete/:id', userController.verifyToken, userController.isUserAdmin, transactionCategoryController.removeTransactionCategory);

export default router;