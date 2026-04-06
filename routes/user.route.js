import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', userController.verifyToken, userController.getAllUsers);
router.get('/:id', userController.verifyToken, userController.getUserById);
router.post('/create', userController.verifyToken, userController.isUserAdmin, userController.createUser);
router.put('/update/:id', userController.verifyToken, userController.isUserAdmin, userController.updateUser);
router.delete('/delete/:id', userController.verifyToken, userController.isUserAdmin, userController.removeUser);

router.post('/login', userController.loginUser);

export default router;