import mongoose from "mongoose";
import { IComment } from "../configs/interface.config";

const commentSchema = new mongoose.Schema({
    content: { type: String, require: [true, "Content can not be blank"] },
    likes: { type: mongoose.Types.ObjectId, ref: "user" },
    replyCM: { type: mongoose.Types.ObjectId, ref: "comment" },
    replyUser: { type: mongoose.Types.ObjectId, ref: "user" },
    blogId: mongoose.Types.ObjectId,
    blogUserId: mongoose.Types.ObjectId,
    comment_root: { type: mongoose.Types.ObjectId, ref: 'comment' }
}, {
    versionKey: false,
    timestamps: true
});

export default mongoose.model<IComment>("comment", commentSchema);