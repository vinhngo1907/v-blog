import mongoose from "mongoose";
import { IBlog } from "../configs/interface.config";

const blogSchema = new mongoose.Schema({
    title: { type: String, require: true, trim: true, maxLength: 50, minLength: 10 },
    content: { type: String, require: true, trim: true, minLength: 2000 },
    description: { type: String, require: true, trim: true, maxLength: 200, minLength: 50 },
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    thumbnail: { type: String, require: true },
    category: { type: mongoose.Types.ObjectId, ref: 'category' },
    // comments: { type: mongoose.Types.ObjectId, ref: "comment" }
}, {
    versionKey: false,
    timestamps: true
});

export default mongoose.model<IBlog>('blog', blogSchema);