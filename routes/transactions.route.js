import express from 'express';
import transactionsController from '../controllers/transactions.controller.js';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', userController.verifyToken, transactionsController.getAllTransactions);
router.get('/type/:type', userController.verifyToken, transactionsController.getTransactionsByType);
router.get('/category/:categoryId', userController.verifyToken, transactionsController.getTransactionsByCategory);
router.get('/date-range', userController.verifyToken, transactionsController.getTransactionsByDateRange);
router.get('/user/:userId', userController.verifyToken, transactionsController.getTransactionsByUser);
router.post('/create', userController.verifyToken, userController.isUserAdmin, userController.isUserFinancialExcecutive, transactionsController.createTransaction);
router.put('/update/:id', userController.verifyToken, userController.isUserAdmin, userController.isUserFinancialExcecutive, transactionsController.updateTransaction);
router.delete('/delete/:id', userController.verifyToken, userController.isUserAdmin, userController.isUserFinancialExcecutive, transactionsController.removeTransaction);

export default router;