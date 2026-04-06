import express from 'express';
import roleController from '../controllers/role.controller.js';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', userController.verifyToken, roleController.getAllRoles);
router.get('/:id', userController.verifyToken, roleController.getRoleById);
router.post('/create', userController.verifyToken, userController.isUserAdmin, roleController.createRole);
router.put('/update/:id', userController.verifyToken, userController.isUserAdmin, roleController.updateRole);
router.delete('/delete/:id', userController.verifyToken, userController.isUserAdmin, roleController.removeRole);

export default router;