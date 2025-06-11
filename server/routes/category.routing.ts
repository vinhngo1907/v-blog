import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.middleware";
import categoryController from "../controllers/category.controller";

router.get('/', categoryController.getCategories);
router.post("/", auth, categoryController.createCategory);
router.patch("/:id", auth, categoryController.updateCategory);
router.delete("/:id", auth, categoryController.deleteCategory);

export default router;