import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken, createActiveToken, verifyActiveToken } from "../utils/generateToken.util";
import userModel from "../models/user.model";
import { validEmail, validPhone } from "../middlewares/valid.middleware";
import { OAuth2Client } from 'google-auth-library';
import sendEmail from "../utils/sendEmail.util";
import { IUser } from "../configs/interface.config";
const client = new OAuth2Client(`${process.env.MAIL_CLIENT_ID}`)
const CLIENT_URL = `${process.env.BASE_URL}`

const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const { account, name, password } = req.body;
            const userExist = await userModel.findOne({
                account: req.body.account
            });

            if (userExist) {
                return res.status(400).json({ message: "Account already exists!" })
            }
            const passwordHashed = await bcrypt.hash(password, 12);
            const newUser = {
                name, account, password: passwordHashed
            }

            const activeToken = await createActiveToken({ newUser });
            console.log({ activeToken })
            const url = `${CLIENT_URL}/active/${activeToken}`
            if (validEmail(account)) {
                await sendEmail(account, url, "Verify your email address");
                return res.json({ msg: "Success! Please check your email" })
            }

            if (validPhone(account)) {
                // send SMS
                return res.json({ msg: "Success! Please check your phone" });
            }


        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },
    login: async (req: Request, res: Response) => {
        try {
            const { account, password } = req.body;
            const user = await userModel.findOne({
                account
            });

            if (!user) {
                return res.status(400).json({ msg: "User not found" })
            }

            loginUser(user, password, res)
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },
    refreshToken: async (req: Request, res: Response) => {
        try {
            const rf_token = req.cookies.rf_token;
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },

    activateAccount: async (req: Request, res: Response) => {
        try {
            const { active_token } = req.body;

            const decoded = await verifyActiveToken(active_token);
            const { newUser } = decoded;
            if (!newUser) return res.status(400).json({ msg: "Invalid authentication." })

            const user = new userModel({ ...newUser });
            await user.save();
            // console.log({ user });
            // const access_token = await createAccessToken({ id: user._id });
            // await createRefreshToken({ id: user._id }, res);

            return res.json({
                msg: "Account has been activated!",

            });

        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    }
}

async function loginUser(user: IUser, password: string, res: Response) {
    try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            let msgError = user.type === 'register'
                ? 'Password is incorrect.'
                : `Password is incorrect. This account login with ${user.type}`
            return res.status(400).json({ msg: msgError })
        }

        const access_token = createAccessToken({ id: user._id });
        const rf_token = createRefreshToken({ id: user._id }, res);
        await userModel.findOneAndUpdate({ _id: user._id }, {
            rf_token
        });

        return res.json({
            msg: 'Login Success!',
            access_token,
            user: { ...user._doc, password: '' }
        })
    } catch (error: any) {
        throw new Error(error);
    }
}

async function registerUser(user: Object, res: Response) {

}

export default authController;