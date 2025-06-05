import { Router } from "express";
import {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../services/categoryService.js";
const router = Router();

router.route("/categories").get(getCategories).post(createCategory);
router
  .route("/categoryID=/:id")
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);
export default router;
