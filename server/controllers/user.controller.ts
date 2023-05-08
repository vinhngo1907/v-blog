import bcrypt from "bcrypt";
import { Request, Response } from "express";

const userController = {
    getUser: async (req: Request, res: Response) => {
        try {

        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },
    updateUser: async (req: Request, res: Response) => {
        try {

        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },
    resetPassword: async (req: Request, res: Response) => {
        try {

        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    }
}

export default userController;