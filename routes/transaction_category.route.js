import express from "express";
import transactionCategoryController from "../controllers/transaction_category.controller.js";
import userController from "../controllers/user.controller.js";
const router = express.Router();

router.get('/', userController.verifyToken, transactionCategoryController.getAllTransactionCategories);
router.get('/:id', userController.verifyToken, transactionCategoryController.getTransactionCategoryById);
router.post('/create', userController.verifyToken, userController.isUserAdmin, transactionCategoryController.createTransactionCategory);
router.put('/update/:id', userController.verifyToken, userController.isUserAdmin, transactionCategoryController.updateTransactionCategory);
router.delete('/delete/:id', userController.verifyToken, userController.isUserAdmin, transactionCategoryController.removeTransactionCategory);

export default router;