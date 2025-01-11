import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken, createActiveToken } from "../utils/generateToken.util";
import userModel from "../models/user.model";
import { validEmail } from "../middlewares/valid.middleware";
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(`${process.env.MAIL_CLIENT_ID}`)
const CLIENT_URL = `${process.env.BASE_URL}`

const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const {account, name, password} = req.body;
            // const {account} = body;
            const userExist = await userModel.findOne({
              account: req.body.account
            });
            if(userExist){
                return res.status(400).json({message:"Email or Phone number already exist"})
            }
            const passwordHashed = await bcrypt.hash(password, 12);
            const newUser = {
                name, account, password: passwordHashed
            }

            const activeToken = await createActiveToken(newUser);
            const url = `${CLIENT_URL}`
            if(validEmail(account)){
                // sendEmail()

            }

        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },
    login: async (req: Request, res: Response) => {
        try {

        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },
    refreshToken: async (req: Request, res: Response) => {
        try {

        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    }
}

async function loginUser() {

}

async function registerUser(user: Object, res: Response) {

}

export default authController;