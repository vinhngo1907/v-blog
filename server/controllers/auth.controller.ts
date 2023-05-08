import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken, createActiveToken } from "../utils/generateToken.util";

const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const body: object = req.body;

        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },
    login: async (req: Request, res: Response) => {
        try {

        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },
    refreshToken: async (req: Request, res: Response) => {
        try {

        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    }
}

async function loginUser() {

}

async function registerUser(user: Object, res: Response) {

}

export default authController;