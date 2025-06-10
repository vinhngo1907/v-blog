import express from "express";
import blogController from "../controllers/blog.controller";
import auth from "../middlewares/auth.middleware";
const router = express.Router();

router.get("/home", blogController.getBlogs);
router.post('/', auth, blogController.createBlog);
router.get('/:id', auth, blogController.getBlog);

export default router;