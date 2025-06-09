import { param } from "express-validator";
import validatorCategory from "../../middlewares/validatorCategory.js";

export const getCategoryValidator = [
  param("id").isMongoId().withMessage("invalid catergory id format "),
  validatorCategory,
];

export const createCategoryValidator = [
  param("name")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("Too short category name.")
    .isLength({ max: 25 })
    .withMessage("Too long category name."),
  validatorCategory,
];

export const updateCategoryValidator = [
  param("id").isMongoId().withMessage("invalid catergory id format "),
  validatorCategory,
];

export const deleteCategoryValidator = [
  param("id").isMongoId().withMessage("invalid catergory id format "),
  validatorCategory,
];
