import { Request, Response } from "express";
import { IReqAuth } from "../configs/interface.config";
import commentModel from "../models/comment.model";
import Pagination from "../utils/pageination.util";
import mongoose from "mongoose";

const commentController = {
    createComment: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication" })
        try {
            const {
                content, blogId, blogUserId
            } = req.body;
            const newComment = new commentModel({ content, blogId: blogId, blogUserId: blogUserId })
            await newComment.save();
            res.json({
                comment: {
                    ...newComment._doc,
                    user: req.user,
                    createdAt: new Date().toISOString()
                }, msg: "Created comment in successfull!!"
            });
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getComments: async (req: Request, res: Response) => {
        const { limit, skip } = Pagination(req);
        try {
            const commentData = await commentModel.aggregate([
                {
                    $facet: {
                        totalData: [
                            {
                                $match: {
                                    blogId: new mongoose.Types.ObjectId(req.params.id),
                                    commentRoot: { $exists: false },
                                    replyUser: { $exists: false }
                                }
                            },
                            {
                                $lookup: {
                                    "from": "users",
                                    "let": { user_id: "$user" },
                                    pipeline: [
                                        { $match: { $expr: { $eq: ["_id", "$$user_id"] } } },
                                        { $project: { name: 1, avatar: 1 } }
                                    ],
                                    as: "user"
                                },
                            },
                            { $unwind: "$user" },
                            {
                                $lookup: {
                                    "from": "comments",
                                    "let": { cm_id: "$replyCM" },
                                    "pipeline": [
                                        { $match: { $expr: { $in: ["_id", "$$cm_id"] } } },
                                        {
                                            $lookup: {
                                                "from": "users",
                                                "let": { user_id: "$user" },
                                                "pipeline": [
                                                    { $match: { $expr: { $eq: ["_id", "$$user_id"] } } },
                                                    { $project: { name: 1, avatar: 1 } }
                                                ],
                                                as: "user"
                                            }
                                        },
                                        { $unwind: "$user" },
                                        {
                                            $lookup: {
                                                "from": "users",
                                                "let": { user_id: "$replyUser" },
                                                "pipeline": [
                                                    { $match: { $expr: { $eq: ["_id", "$$user_id"] } } },
                                                    { $project: { name: 1, avatar: 1 } }
                                                ],
                                                as: "reply_user"
                                            }
                                        },
                                        { $unwind: "$reply_user" }

                                    ],
                                    as: "replyCM"
                                }
                            },
                            { $sort: { "createdAt": -1 } },
                            { $skip: skip },
                            { $limit: limit }
                        ],
                        totalCount: [
                            {
                                $match: {
                                    blogId: new mongoose.Types.ObjectId(req.params.id),
                                    commentRoot: { $exists: false },
                                    replyUser: { $exists: false },
                                }
                            },
                            { $count: 'count' }
                        ]
                    }
                },
                {
                    $project: {
                        count: { $arrayElementAt: ["$totalCount.count", 0] },
                        totalData: 1
                    }
                }
            ]);

            const count = commentData[0].count;
            res.json({
                msg: "Success",
                total: (count / limit === 0) ? (count / limit) : (Math.floor(count / limit)) + 1,
                comments: commentData[0].totalData

            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

export default commentController;