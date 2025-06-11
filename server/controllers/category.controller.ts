import { Request, Response } from "express";
import categoryModel from "../models/category.model";
import { IReqAuth } from "../configs/interface.config";
import blogModel from "../models/blog.model";

const categoryController = {
    getCategories: async (req: Request, res: Response) => {
        try {
            const categories = await categoryModel.find({});
            res.json({ msg: "Success", categories });
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },

    createCategory: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authorization" });
        if (req.user.role !== 'admin')
            return res.status(400).json({ msg: "You don't have permission to create category." })
        try {
            const newCategory = new categoryModel({ name: req.body.name });
            await newCategory.save();
            res.json({ msg: "Created category in successfull!!!", category: newCategory })
        } catch (err: any) {
            let errMsg;

            if (err.code === 11000) {
                errMsg = Object.values(err.keyValue)[0] + " already exists."
            } else {
                let name = Object.keys(err.errors)[0]
                errMsg = err.errors[`${name}`].message
            }
            return res.status(500).json({ msg: errMsg });
        }
    },

    updateCategory: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." })
        if (req.user.role !== 'admin')
            return res.status(400).json({ msg: "You don't have permission to update category." })

        try {
            const updatedCategory = await categoryModel.findOneAndUpdate({
                _id: req.params.id
            }, {
                name: req.body.name
            }, { new: true, runValidators: true });

            if (!updatedCategory) return res.status(400).json({ msg: "Category not found or/and user not authorized" });
            res.json({ msg: "Updated blog in successfully", category: updatedCategory })
        } catch (err: any) {
            let errMsg;

            if (err.code === 11000) {
                errMsg = Object.values(err.keyValue)[0] + " already exists."
            } else {
                let name = Object.keys(err.errors)[0]
                errMsg = err.errors[`${name}`].message
            }
            return res.status(500).json({ msg: errMsg });
        }
    },
    deleteCategory: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authorization" });
        if (req.user.role !== 'admin')
            return res.status(400).json({ msg: "You don't have permission to delete category." })
        try {
            const blog = await blogModel.findOne({ category: req.params.id })
            if (blog)
                return res.status(400).json({
                    msg: "Can not delete! In this category also exist blogs."
                })

            const deletedCategory = await categoryModel.findByIdAndDelete(req.params.id);
            if (!deletedCategory) return res.status(400).json({ msg: "Category not found or/and user not authorized" });

            res.json({ msg: "Deleted category in successfully!!!" });
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

export default categoryController;