import express from 'express';
import dotenv from 'dotenv';
import  RoleRoute from './routes/role.routes.js';
import  UserRoute from './routes/user.route.js';
import TransactionCategoryRoute from './routes/transaction_category.route.js';
import TransactionRoute from './routes/transactions.route.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/Roles', RoleRoute);
app.use('/Users', UserRoute);
app.use('/TransactionCategories', TransactionCategoryRoute);
app.use('/Transactions', TransactionRoute);

app.listen(process.env.PORT, (req, res)=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});