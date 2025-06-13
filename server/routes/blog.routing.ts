import express from "express";
import blogController from "../controllers/blog.controller";
import auth from "../middlewares/auth.middleware";
const router = express.Router();

router.get('/category/:id/', blogController.getBlogsByCategory);
router.get("/home", blogController.getBlogs);
router.post('/', auth, blogController.createBlog);
router.get('/:id', blogController.getBlog);
router.get("/:id/user", blogController.getBlogs);
router.put("/:id", auth, blogController.updateBlog);
router.delete("/:id", auth, blogController.deleteBlog);

export default router;