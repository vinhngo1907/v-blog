import express from "express";
import commentController from "../controllers/comment.controller";
import auth from "../middlewares/auth.middleware";
const router = express.Router();

router.get("/", commentController.getComments);
router.post('/', auth, commentController.createComment);

export default router;