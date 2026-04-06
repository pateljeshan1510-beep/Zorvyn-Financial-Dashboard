import dbConnection from '../database/config.js';
class Role {
    constructor (id, name, status, createdOn, updatedOn) {
        this.RoleID = id;
        this.RoleName = name;
        this.Status = status;
        this.CreatedOn = createdOn;
        this.UpdatedOn = updatedOn;
    }

    static async findAll() {
        const [rows] = await dbConnection.execute('SELECT * FROM role');
        return rows.map(row => new Role(row.RoleID, row.RoleName, row.Status, row.CreatedOn, row.UpdatedOn));
    }

    static async create(role) {
        const [result] = await dbConnection.execute("INSERT INTO role (RoleName, Status, CreatedAt, UpdatedAt) VALUES (?, ?, NOW(), NOW())", [role.RoleName, role.Status]);
        return result;
    }

    static async findById(id) {
        const [rows] = await dbConnection.execute('SELECT * FROM role WHERE RoleID = ?', [id]);
        if (rows.length === 0) {
            return null;
        }
        return new Role(rows[0].RoleID, rows[0].RoleName, rows[0].Status, rows[0].CreatedOn, rows[0].UpdatedOn);
    }

    static async findByName(name) {
        const [rows] = await dbConnection.execute('SELECT * FROM role WHERE RoleName = ?', [name]);
        if (rows.length === 0) {
            return null;
        }
        return new Role(rows[0].RoleID, rows[0].RoleName, rows[0].Status, rows[0].CreatedOn, rows[0].UpdatedOn);
    }

    static async update(id, role) {
        const [result] = await dbConnection.execute('UPDATE role SET RoleName = ?, Status = ?, UpdatedAt = NOW() WHERE RoleID = ?', [role.RoleName, role.Status, id]);
        return result;
    }

    static async delete(id) {
        const [result] = await dbConnection.execute('DELETE FROM role WHERE RoleID = ?', [id]);
        return result;
    }
}

export default Role;