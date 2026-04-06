import express from 'express';
import roleController from '../controllers/role.controller.js';
import userController from '../controllers/user.controller.js';

const router = express.Router();

// Get All Roles API access by All User Types
router.get('/', userController.verifyToken, roleController.getAllRoles);

// Get Role by ID API access by All User Types
router.get('/:id', userController.verifyToken, roleController.getRoleById);

// Create Role API access by Admin Users Only
router.post('/create', userController.verifyToken, userController.isUserAdmin, roleController.createRole);

// Update Role API access by Admin Users Only
router.put('/update/:id', userController.verifyToken, userController.isUserAdmin, roleController.updateRole);

// Delete Role API access by Admin Users Only
router.delete('/delete/:id', userController.verifyToken, userController.isUserAdmin, roleController.removeRole);

export default router;