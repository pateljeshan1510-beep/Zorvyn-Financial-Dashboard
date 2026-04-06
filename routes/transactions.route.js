import express from 'express';
import transactionsController from '../controllers/transactions.controller.js';
import userController from '../controllers/user.controller.js';

const router = express.Router();

// Get All Transactions API access by All User Types
router.get('/', userController.verifyToken, transactionsController.getAllTransactions);

// Get Transactions by Type API access by All User Types
router.get('/type/:type', userController.verifyToken, transactionsController.getTransactionsByType);

// Get Transactions by Category API access by All User Types
router.get('/category/:categoryId', userController.verifyToken, transactionsController.getTransactionsByCategory);

// Get Transactions by Date Range API access by All User Types
router.get('/date-range', userController.verifyToken, transactionsController.getTransactionsByDateRange);

// Get Transactions by User API access by All User Types
router.get('/user/:userId', userController.verifyToken, transactionsController.getTransactionsByUser);

// Create Transaction API access by Admin and Financial Executive Users Only
router.post('/create', userController.verifyToken, userController.isUserAdmin, userController.isUserFinancialExcecutive, transactionsController.createTransaction);

// Update Transaction API access by Admin and Financial Executive Users Only
router.put('/update/:id', userController.verifyToken, userController.isUserAdmin, userController.isUserFinancialExcecutive, transactionsController.updateTransaction);

// Delete Transaction API access by Admin and Financial Executive Users Only
router.delete('/delete/:id', userController.verifyToken, userController.isUserAdmin, userController.isUserFinancialExcecutive, transactionsController.removeTransaction);

export default router;