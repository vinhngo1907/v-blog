import mongoose from "mongoose";
import { IUser } from '../configs/interface.config';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    account: { type: String, required: [true, "Please add your email or phone"], unique: true },
    name: { type: String, required: true, unique: true, maxLength: 25, trim: true },
    password: { type: String, required: [true, "Please add your password"] },
    avatar: { type: String, default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png' },
    role: {
        type: String,
        default: 'user' // admin
    },
    type: {
        type: String,
        default: 'register' // login
    },
    rf_token: { type: String, select: false }
});

export default mongoose.model<IUser>('user',UserSchema);