import bcrypt from "bcrypt";
import { Request, Response } from "express";
import categoryModel from "../models/category.model";

const categoryController = {
    getCategories: async (req: Request, res: Response) => {
        try {
            const categories = await categoryModel.find({});
            res.json({msg: "Success", categories});
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

export default categoryController;