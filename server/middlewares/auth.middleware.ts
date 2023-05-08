import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";
import { IDecodeToken, IReqAuth } from "../configs/interface.config";

const auth = async (req: IReqAuth, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.header('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(403).json({ msg: "You don't have permission" });
        }
        const decoded = <IDecodeToken>jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);

        if (!decoded) return res.status(401).json({ msg: "Invalid Authentication." });

        const user = await userModel.findOne({ _id: decoded.id }).select("-password");
        if (!user) return res.status(400).json({ msg: "User does not exist." });

        req.user = user;
        next();
    } catch (error: any) {
        return res.status(500).json({ msg: error.message });
    }
}

export default auth