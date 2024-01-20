import express from "express";
import cors from "cors";
import UserRoute from './routes/UserRoute.js';
import db from './config/Database.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);

(async () => {
    await db.sync({ alter: true });
    console.log('Database synchronized successfully.');

    db.options.logging = (query, timing) => {
        console.log('Executing:', query);
    };

    const PORT = 8000; 

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log('Server up and running...');
    });
})();
