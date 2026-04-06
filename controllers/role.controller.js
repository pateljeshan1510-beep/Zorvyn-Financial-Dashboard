import Role from '../models/Role.js';

const roleController = {
    getAllRoles: async (req, res) => {
        try {
            const roles = await Role.findAll();
            res.json(roles);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getRoleById: async (req, res) => {
        try {
            const roleId = req.params.id;
            const role = await Role.findById(roleId);
            if(!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.json(role);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createRole: async (req, res) => {
        try {
            console.log("Create Request called!");
            const { RoleName, Status } = req.body;
            
            console.log(req.body);
            const newRole = new Role(null, RoleName, Status, null, null);
            const result = await Role.create(newRole);
            res.status(201).json({ message: 'Role created successfully', roleId: result.insertId });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateRole: async (req, res) => {
        try {
            console.log("Update Request called!");
            const roleId = req.params.id;
            const { RoleName, Status } = req.body;
            console.log(req.body);
            
            const role = new Role(roleId, RoleName, Status, null, null);
            const result = await Role.update(roleId, role);
            res.json({ message: 'Role updated successfully', roleId: result.affectedRows });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    removeRole: async (req, res) => {
        try {
            const roleId = req.params.id;
            const result = await Role.delete(roleId);
            res.json({ message: 'Role deleted successfully', roleId: result.affectedRows });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default roleController;