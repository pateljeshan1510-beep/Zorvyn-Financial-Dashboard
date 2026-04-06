import e from 'express';
import dbConnection from '../database/config.js';

class Transactions{
    constructor(transactionID, categoryID, userID, transactionAmount, status, transactionNote, transactionDate, updatedOn) {
        this.TransactionID = transactionID;
        this.CategoryID = categoryID;
        this.UserID = userID;
        this.TransactionAmount = transactionAmount;
        this.Status = status;
        this.TransactionNote = transactionNote;
        this.TransactionDate = transactionDate;
        this.UpdatedAt = updatedOn;        
    }

    static async findAll() {
        const [rows] = await dbConnection.execute('SELECT * FROM transactions');
        return rows;
    }

    static async findByType(type) {
        const [rows] = await dbConnection.execute('SELECT * FROM transactions WHERE CategoryID IN (SELECT ID FROM transactioncategory WHERE Type = ?)', [type]);
        console.log(rows);
        
        return rows.map(row => new Transactions(row.transactionID, row.categoryID, row.userID, row.transactionAmount, row.status, row.transactionNote, row.transactionDate, row.updatedAt));
    }

    static async findByCategory(categoryID) {
        const [rows] = await dbConnection.execute('SELECT * FROM transactions WHERE CategoryID = ?', [categoryID]);
        return rows.map(row => new Transactions(row.transactionID, row.categoryID, row.userID, row.transactionAmount, row.status, row.transactionNote, row.transactionDate, row.updatedAt));
    }

    static async findByDateRange(startDate, endDate) {
        const [rows] = await dbConnection.execute('SELECT * FROM transactions WHERE TransactionDate BETWEEN ? AND ?', [startDate, endDate]);
        return rows.map(row => new Transactions(row.transactionID, row.categoryID, row.userID, row.transactionAmount, row.status, row.transactionNote, row.transactionDate, row.updatedAt));
    }

    static async findByUser(userID) {
        const [rows] = await dbConnection.execute('SELECT * FROM transactions WHERE UserID = ?', [userID]);
        return rows.map(row => new Transactions(row.transactionID, row.categoryID, row.userID, row.transactionAmount, row.status, row.transactionNote, row.transactionDate, row.updatedAt));
    }

    static async create(transaction) {
        const [result] = await dbConnection.execute("INSERT INTO transactions (CategoryID, UserID, TransactionAmount, Status, TransactionNote, TransactionDate, UpdatedAt) VALUES (?, ?, ?, ?, ?, (NOW()-INTERVAL FLOOR(RAND()*365) DAY), NOW())", [transaction.CategoryID, transaction.UserID, transaction.TransactionAmount, transaction.Status, transaction.TransactionNote]);
        return result;
    }

    static async update(id, transaction) {
        const [result] = await dbConnection.execute('UPDATE transactions SET categoryID = ?, userID = ?, transactionAmount = ?, status = ?, transactionNote = ?, transactionDate = ?, UpdatedAt = NOW() WHERE transactionID = ?', [transaction.CategoryID, transaction.UserID, transaction.TransactionAmount, transaction.Status, transaction.TransactionNote, transaction.TransactionDate, id]);
        return result;
    }

    static async delete(id) {
        const [result] = await dbConnection.execute('DELETE FROM transactions WHERE transactionID = ?', [id]);
        return result;
    }
}

export default Transactions;