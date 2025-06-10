import { Request, Response } from "express";
import blogModel from "../models/blog.model";
import { IBlog, IReqAuth } from "../configs/interface.config";
import mongoose from "mongoose";

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
            ]);
            res.json({ blogList: data, msg: "List blogs in home page successfully!!!" });
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
            const blog = await blogModel.findOne({ _id: req.params.id }).populate("user", "-password -rf_token");
            if (!blog) return res.status(400).json({ msg: "Blog not found" });

            res.json({ msg: "Get blog detail in successfully!!!", blog });
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getBlogsByCategory: async (req: Request, res: Response) => {
        const { limit, page, skip } = Pagination(req);

        try {
            const blogs = await blogModel.aggregate([
                {
                    $facet: {
                        totalData: [
                            {
                                $match: {
                                    category: new mongoose.Types.ObjectId(req.params.id)
                                }
                            },
                            {
                                $lookup: {
                                    from: "users",
                                    let: { user_id: "$user" },
                                    pipeline: [
                                        { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                                        { $project: { password: 0, rf_token: 0 } }
                                    ],
                                    as: "user"
                                }
                            },
                            { $unwind: "$user" },
                            { $sort: { "createdAt": -1 } },
                            { $skip: skip },
                            { $limit: limit }
                        ],
                        totalCount: [
                            {
                                $match: { category: new mongoose.Types.ObjectId(req.params.id) }
                            },
                            { $count: 'count' }
                        ],
                    }
                },
                {
                    $project: {
                        count: { $arrayElement: ["$totalCount.count", 0] },
                        totalData: 1
                    }
                }
            ]);

            const count = blogs[0].count;
            res.json({
                blogs: blogs[0].totalData,
                count: blogs[0].count,
                total: (count % limit) === 0 ? (count / limit) : (Math.floor(count / limit) + 1),
                msg: "Success"
            });

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    },

    getBlogsByUser: async (req: Request, res: Response) => {
        const { limit, skip } = Pagination(req);
        try {
            const blogs = await blogModel.aggregate([
                {
                    $facet: {
                        totalData: [
                            {
                                $match: {
                                    user: new mongoose.Types.ObjectId(req.params.id)
                                }
                            },
                            {
                                $lookup: {
                                    from: "users",
                                    let: { user_id: "$user" },
                                    pipeline: [
                                        { $match: { $expr: { $eq: ["$_id", "$$user+_id"] } } },
                                        { $project: { password: 0, rf_token: 0 } }
                                    ],
                                    as: "user"
                                }
                            },
                            { $unwind: "$user" },
                            { $sort: { "createdAt": -1 } },
                            { $limit: limit },
                            { $skip: skip }
                        ],
                        totalCount: [
                            { $match: { user: new mongoose.Types.ObjectId(req.params.id) } },
                            { $count: "count" }
                        ]
                    }
                },
                {
                    $project: {
                        count: { $arrayElement: ["$totalCount.count", 0] },
                        totalData: 1
                    }
                }
            ]);
            const count = blogs[0].count;
            res.json({
                blogs: blogs[0].totalData,
                total: (count % limit === 0) ? (count / limit) : (Math.floor(count / limit) + 1)
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    },
    updateBlog: async (req: IReqAuth, res: Response) => {
        try {

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    },
    delete: async (req: IReqAuth, res: Response) => {
        try {

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });

        }
    }
}

const Pagination = (req: IReqAuth) => {
    let page = Number(req.query.page) * 1 || 1;
    let limit = Number(req.query.limit) * 1 || 4;
    let skip = (page - 1) * limit;

    return { page, limit, skip };
}

export default blogController;