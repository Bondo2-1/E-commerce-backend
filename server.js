import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/database.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import ApiError from "./utils/ApiError.js";
import globalErrorHandler from "./middlewares/errorMiddleware.js";
dotenv.config({ path: "config.env" });

//connect to database
dbConnection();

// express app
const app = express();

// middleware
app.use(express.json());

// mount routes
app.use("/api", categoryRoutes);

// middleware handleing  routes not found
app.use((req, res, next) => {
  next(new ApiError(`Route ${req.originalUrl} not found`, 400));
});

// global error handler middleware
app.use(globalErrorHandler);

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`app running on port:${PORT}`);
});

// handle error out of express like mongodb
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection error: ${err.name} ${err.message}`);
  server.close(() => {
    console.error(`shutdown . . . `);
    process.exit(1);
  });
});
