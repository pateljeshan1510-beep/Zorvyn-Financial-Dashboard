import User from '../models/User.js';
import Role from '../models/Role.js';
import jwt from 'jsonwebtoken';

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createUser: async (req, res) => {
        try {
            const { FullName, Email, Password, RoleName, Status } = req.body;

            const role = await Role.findByName(RoleName);

            const newUser = new User(null, FullName, Email, Password, role.RoleID, Status, null, null);

            const result = await User.create(newUser);
            res.status(201).json({ message: 'User created successfully', userId: result.insertId });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Login API Business Logic with JWT Token Assignment
    loginUser: async (req, res) => {
        try {
            const { Email, Password } = req.body;

            const result = await User.login(Email, Password);
            if (result === 0) {
                return res.status(401).json(result);
            }
            
            res.status(200).header("auth-token", result).send("Login successful", { token: result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Middleware to Verify JWT Token and Authorize User Access to APIs based on User Role
    verifyToken: async (req, res, next) => {
        try {
            // Get token from Authorization header (Bearer <token>)
            let token = req.headers.authorization;
            
            if (!token) {
                return res.status(401).json({ message: 'Access denied. Trying to make Unauthorized Request!' });
            }
            
            // Remove 'Bearer ' prefix if present
            token = token.split(' ')[1];

            // Verify token and decode user information
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // If token is valid, attach user information to request object and proceed to next middleware or route handler
            if (!decoded) {
                return res.status(401).json({ message: 'Access denied. Trying to make Unauthorized Request!' });
            }
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Access denied. Trying to make Unauthorized Request!' });
        }
    },

    // Middleware to Check if User has Admin Role for Accessing Admin-Only APIs
    isUserAdmin: async (req, res, next) => {
        try {
            const roleId = req.user.role;
            const role = await Role.findById(roleId);

            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            next();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Middleware to Check if User has Financial Executive Role for Accessing Financial Executive-Only APIs
    isUserFinancialExcecutive: async (req, res, next) => {
        try {
            const roleId = req.user.role;
            const role = await Role.findById(roleId);
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            next();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Middleware to Check if User has Financial Analyst Role for Accessing Financial Analyst-Only APIs
    isUserFinancialAnalyst: async (req, res, next) => {
        try {
            const roleId = req.user.role;
            const role = await Role.findById(roleId);
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            next();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },    

    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;

            const { FullName, Email, Password, RoleName, Status } = req.body;
            const role = await Role.findByName(RoleName);

            const user = new User(userId, FullName, Email, Password, role.RoleID, Status, null, null);
            const result = await User.update(userId, user);

            res.json({ message: 'User updated successfully', userId: result.affectedRows });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    removeUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const result = await User.delete(userId);
            res.json({ message: 'User deleted successfully', userId: result.affectedRows });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default userController;