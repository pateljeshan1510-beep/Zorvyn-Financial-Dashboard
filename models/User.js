import { json } from 'express';
import dbConnection from '../database/config.js';
import Role from './Role.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class User {
    constructor(id, fullname, email, password, roleId, status, createdOn, updatedOn) {
        this.UserID = id;
        this.FullName = fullname;
        this.Email = email;
        this.Password = password;
        this.RoleID = roleId;
        this.Status = status;
        this.CreatedOn = createdOn;
        this.UpdatedOn = updatedOn;
    }

    static async findAll() {
        const [rows] = await dbConnection.execute('SELECT * FROM user');
        return rows.map(row => new User(row.UserID, row.FullName, row.Email, row.Password, row.RoleID, row.Status, row.CreatedOn, row.UpdatedOn));
    }

    static async create(user) {
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(user.Password, salt);

        let payload = { id: user.UserID, role: user.RoleID || 0 };
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        const [result] = await dbConnection.execute("INSERT INTO user (FullName, Email, Password, RoleID, Status, CreatedAt, UpdatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())", [user.FullName, user.Email, user.Password, user.RoleID, user.Status]);
        return { result, token };
    }

    static async login(email, password) {
        const [rows] = await dbConnection.execute('SELECT * FROM user WHERE Email = ?', [email]);
        if (rows.length === 0) {
            return 0;
        }
        const user = new User(rows[0].UserID, rows[0].FullName, rows[0].Email, rows[0].Password, rows[0].RoleID, rows[0].Status, rows[0].CreatedOn, rows[0].UpdatedOn);
        const isMatch = await bcrypt.compare(password, user.Password);

        if (!isMatch) {
            return 0;
        }
        
        let payload = { id: user.UserID, role: user.RoleID || 0 };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        
        return token;
    }

    static async findById(id) {
        const [rows] = await dbConnection.execute('SELECT * FROM user WHERE UserID = ?', [id]);
        if (rows.length === 0) {
            return null;
        }
        return new User(rows[0].UserID, rows[0].FullName, rows[0].Email, rows[0].Password, rows[0].RoleID, rows[0].Status, rows[0].CreatedOn, rows[0].UpdatedOn);
    }

    static async findByName(name) {
        const [rows] = await dbConnection.execute('SELECT * FROM user WHERE FullName = ?', [name]);
        if (rows.length === 0) {
            return null;
        }
        return new User(rows[0].UserID, rows[0].FullName, rows[0].Email, rows[0].Password, rows[0].RoleID, rows[0].Status, rows[0].CreatedOn, rows[0].UpdatedOn);
    }

    static async update(id, user) {
        const [result] = await dbConnection.execute('UPDATE user SET FullName = ?, Email = ?, Password = ?, RoleID = ?, Status = ?, UpdatedAt = NOW() WHERE UserID = ?', [user.FullName, user.Email, user.Password, user.RoleID, user.Status, id]);
        return result;
    }

    static async delete(id) {
        const [result] = await dbConnection.execute('DELETE FROM user WHERE UserID = ?', [id]);
        return result;
    }
}

export default User;