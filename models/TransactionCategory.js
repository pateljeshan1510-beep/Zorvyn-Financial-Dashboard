import dbConnection from '../database/config.js';

class TransactionCategory{
    constructor(id, category, status, type, createdOn, updatedOn) {
        this.ID = id;
        this.Category = category;
        this.Status = status;
        this.Type = type;
        this.CreatedAt = createdOn;
        this.UpdatedAt = updatedOn;
    }

    static async findAll() {
        const [rows] = await dbConnection.execute('SELECT * FROM transactioncategory');
        return rows.map(row => new TransactionCategory(row.ID, row.Category, row.Status, row.Type, row.CreatedAt, row.UpdatedAt));
    }

    static async create(transactionCategory) {
        const [result] = await dbConnection.execute("INSERT INTO transactioncategory (Category, Status, Type, CreatedAt, UpdatedAt) VALUES (?, ?, ?, NOW(), NOW())", [transactionCategory.Category, transactionCategory.Status, transactionCategory.Type]);
        return result;
    }

    static async findById(id) {
        const [rows] = await dbConnection.execute('SELECT * FROM transactioncategory WHERE ID = ?', [id]); 
        if (rows.length === 0) {
            return null;
        }
        return new TransactionCategory(rows[0].ID, rows[0].Category, rows[0].Status, rows[0].Type, rows[0].CreatedAt, rows[0].UpdatedAt);
    }

    static async findByName(categoryName) {
        const [rows] = await dbConnection.execute('SELECT * FROM transactioncategory WHERE Category = ?', [categoryName]);
        if (rows.length === 0) {
            return null;
        }
        return new TransactionCategory(rows[0].ID, rows[0].Category, rows[0].Status, rows[0].Type, rows[0].CreatedAt, rows[0].UpdatedAt);
    }

    static async update(id, transactionCategory) {
        const [result] = await dbConnection.execute('UPDATE transactioncategory SET Category = ?, Status = ?, Type = ?, UpdatedAt = NOW() WHERE ID = ?', [transactionCategory.Category, transactionCategory.Status, transactionCategory.Type, id]);
        return result;
    }

    static async delete(id) {
        const [result] = await dbConnection.execute('DELETE FROM transactioncategory WHERE ID = ?', [id]);
        return result;
    }
}

export default TransactionCategory;