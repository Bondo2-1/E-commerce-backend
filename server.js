import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/database.js";
import categoryRoutes from "./routes/categoryRoutes.js";
dotenv.config({ path : 'config.env' });

//connect to database
dbConnection();

// express app
const app = express();


// middleware
app.use(express.json());

// mount routes
app.use('/api',categoryRoutes)


const PORT = process.env.PORT || 4000;
app.listen(PORT,() =>{
    console.log(`app running on port:${PORT}` );
})