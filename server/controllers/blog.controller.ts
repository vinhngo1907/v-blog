import { Request, Response } from "express";
import userModel from "../models/user.model";
import blogModel from "../models/blog.model";
import { IBlog, IReqAuth } from "../configs/interface.config";
const blogController = {
    getBlogs: async (req: Request, res: Response) => {
        try {
            const data = await blogModel.aggregate([
                // User
                {
                    $lookup: {
                        from: "users",
                        let: { user_id: "$user" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                            { $project: { password: 0, rf_token: 0, __v: 0 } }

                        ],
                        as: "user"
                    }
                }, { $unwind: "$user" },
                // Category
                {
                    $lookup: {
                        from: "categories",
                        let: { category_id: "$category" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$category_id"] } } },
                        ],
                        as: "category"
                    },
                }, { $unwind: "$category" },
                { $sort: { "createdAt": -1 } },
                // Group by category
                {
                    $group: {
                        _id: "$category._id",
                        name: { $first: "$category.name" },
                        blogs: { $push: "$$ROOT" },
                        count: { "$sum": 1 }
                    }
                },
                // Pagaination
                {
                    $project: {
                        blogs: {
                            $slice: ["$blogs", 0, 4]
                        },
                        count: 1,
                        name: 1
                    }
                }
            ])
            res.json({ data,msg: "List blogs in home page successfully!!!" })
        } catch (error: any) {
            return res.status(500).json({
                msg: error.message
            });
        }
    },
    createBlog: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." });

        try {
            const { title, content, description, thumbnail, category }: IBlog = req.body;
            const newBlog = new blogModel({
                title, content, description, thumbnail, user: req.user._id, category
            });

            await newBlog.save();
            res.json({ blog: { ...newBlog._doc, user: req.user }, msg: "Created blog in successfully" })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getBlog: async (req: IReqAuth, res: Response) => {
        try {

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

export default blogController;