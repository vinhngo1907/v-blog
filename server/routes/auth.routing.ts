import express from "express";
const router = express.Router();
import authController from "../controllers/auth.controller";
// const volumeController = new VolumeController();

router.post('/refresh-token',authController.refreshToken);
router.post('/login',authController.login);
router.post('/register',authController.register);

export default router;