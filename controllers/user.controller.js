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
            console.log("Create Request called!");
            const { FullName, Email, Password, RoleName, Status } = req.body;

            const role = await Role.findByName(RoleName);

            console.log("Role found: ", role);
            const newUser = new User(null, FullName, Email, Password, role.RoleID, Status, null, null);
            console.log("New User: ", newUser);
            const result = await User.create(newUser);
            res.status(201).json({ message: 'User created successfully', userId: result.insertId });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    loginUser: async (req, res) => {
        try {
            console.log("Login Request called!");
            const { Email, Password } = req.body;
            console.log(req.body);
            
            const result = await User.login(Email, Password);
            if (result === 0) {
                return res.status(401).json(result);
            }
            console.log("Token: ", result);
            
            res.status(200).header("auth-token", result).send("Login successful", { token: result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    verifyToken: async (req, res, next) => {
        try {
            let token = req.headers.authorization;

            console.log("Token : ", token);
            
            if (!token) {
                return res.status(401).json({ message: 'Access denied. Trying to make Unauthorized Request!' });
            }
            console.log("Pass 1");
            
            token = token.split(' ')[1];

            console.log("Pass 2 : ", token);
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) {
                return res.status(401).json({ message: 'Access denied. Trying to make Unauthorized Request!' });
            }
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Access denied. Trying to make Unauthorized Request!' });
        }
    },

    isUserAdmin: async (req, res, next) => {
        try {
            console.log("Admin Check!");
            
            console.log(req);
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

    isUserFinancialExcecutive: async (req, res, next) => {
        try {
            console.log("User : ",req.user);
            
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

    isUserFinancialAnalyst: async (req, res, next) => {
        try {
            console.log(req.user);
            
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
            console.log("Update Request called!");
            const userId = req.params.id;
            const { FullName, Email, Password, RoleName, Status } = req.body;
            const role = await Role.findByName(RoleName);

            console.log("Role found: ", role);
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