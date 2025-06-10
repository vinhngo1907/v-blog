import { Request, Response } from "express";
import userModel from "../models/user.model";
import blogModel from "../models/blog.model";
import { IBlog, IReqAuth } from "../configs/interface.config";
const blogController = {
    getBlogs: async (req: Request, res: Response) => {
        try {
            const blogs = await blogModel.find({})
            res.json({
                blogs,

            })
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
    }
}

export default blogController;