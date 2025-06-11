import express from "express";
const router = express.Router();
import authController from "../controllers/auth.controller";

router.post('/register', authController.register);
router.get('/refresh_token', authController.refreshToken);
router.post('/login', authController.login);
router.post('/active', authController.activateAccount);

export default router;