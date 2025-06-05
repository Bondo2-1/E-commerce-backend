//export get categories to return all categories  and save in model
import CategoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import expressAsyncHandler from "express-async-handler";

//@desc    Get all categories with pagination
export const getCategories = expressAsyncHandler(async (req, res) => {
  //code of pagination
  const pages = req.query.page * 1 || 1; //convert to number and make default to 1
  const limit = req.query.limit * 1 || 3; //convert to number and make default to 3
  const skip = (pages - 1) * limit; //skip the data in each page
  const foundCategories = await CategoryModel.find({}).skip(skip).limit(limit);
  res
    .status(200)
    .json({ results: foundCategories.length, pages, data: foundCategories });
});

// @desc   Get a single category by id
export const getCategoryById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const foundCategory = await CategoryModel.findById(id);
  if (!foundCategory) {
    res.status(404).json({ message: `Category with id ${id} not found` });
  }
  res.status(200).json({ data: foundCategory });
});

//@desc    Create a new category
export const createCategory = expressAsyncHandler(async (req, res) => {
  const name = req.body.name;
  // asynce await
  const categoryExists = await CategoryModel.create({
    name,
    slug: slugify(name),
  });
  res.status(201).json({ data: categoryExists });
});

//@desc    Update a category
export const updateCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedCategory = await CategoryModel.findByIdAndUpdate(
    id,
    {
      name,
      slug: slugify(name),
    },
    { new: true }
  );
  if (!updatedCategory) {
    res.status(404).json({ message: `Category with id ${id} not found` });
  } else {
    res.status(200).json({ data: updatedCategory });
  }
});

//@desc    Delete a category
export const deleteCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedCategory = await CategoryModel.findByIdAndDelete(id);
  if (!deletedCategory) {
    res.status(404).json({ message: `Category with id ${id} not found` });
  } else {
    res.status(204).send(); // No content to send back
  }
});
