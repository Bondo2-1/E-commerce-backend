// create schema for category using mongodb and mongoose
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "Category name must be at least 3 characters long"],
        maxlength: [25, "Category name must not exceed 25 characters"],
        unique: true,
    },
    image: String,
    slug: {
        type: String,
        lowercase: true,
    },
},
 { timestamps: true });

// Create a model from the schema
const CategoryModel = mongoose.model('Category', categorySchema);

export default CategoryModel;