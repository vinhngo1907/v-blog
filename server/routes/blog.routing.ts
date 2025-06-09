import * as express from "express";
import blogController from "../controllers/blog.controller";
import auth from "../middlewares/auth.middleware";
const router = express.Router();

router.get("/home", blogController.getBlogs);
router.post('/blog', auth, blogController.createBlog)

export default router;