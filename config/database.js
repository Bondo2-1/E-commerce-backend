import mongoose from "mongoose";

const dbConnection = async () => {
    const uri = process.env.DB_URI;
    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

export default dbConnection;