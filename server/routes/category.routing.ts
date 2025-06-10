import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.middleware";
import categoryController from "../controllers/category.controller";

router.get('/:id', auth, categoryController.getCategories);

export default router;