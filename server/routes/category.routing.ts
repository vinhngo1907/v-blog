import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.middleware";
import categoryController from "../controllers/category.controller";

router.get('/', categoryController.getCategories);
router.post("/", auth, categoryController.createCategory);
router.patch("/:id", auth, categoryController.updateCategory);

export default router;