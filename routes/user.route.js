import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

// Get All Users API access by All Users
router.get('/', userController.verifyToken, userController.getAllUsers);

// Get User by ID API access by All Users
router.get('/:id', userController.verifyToken, userController.getUserById);

// Create User API access by Admin Users Only
router.post('/create', userController.verifyToken, userController.isUserAdmin, userController.createUser);

// Update User API access by Admin Users Only
router.put('/update/:id', userController.verifyToken, userController.isUserAdmin, userController.updateUser);

// Delete User API access by Admin Users Only
router.delete('/delete/:id', userController.verifyToken, userController.isUserAdmin, userController.removeUser);

router.post('/login', userController.loginUser);

export default router;