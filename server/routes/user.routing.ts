import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller";
import auth from "../middlewares/auth.middleware";

router.get('/:id', auth, userController.getUser);
router.patch('/', auth, userController.updateUser);
router.patch('/reset-password', auth, userController.resetPassword);

export default router;