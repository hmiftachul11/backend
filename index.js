import express from "express";
import cors from "cors";
import UserRoute from './routes/UserRoute.js';
import db from './config/Database.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);

// Sync the database and log SQL queries
(async () => {
    await db.sync({ alter: true });
    console.log('Database synchronized successfully.');

    // Log SQL queries
    db.options.logging = (query, timing) => {
        console.log('Executing:', query);
    };

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
        console.log('Server up and running...');
    });
})();
