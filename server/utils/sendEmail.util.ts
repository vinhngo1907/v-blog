const nodemailer = require("nodemailer");
import { OAuth2Client } from "google-auth-library";

const {
    MAIL_CLIENT_ID,
    MAIL_CLIENT_SECRET,
    MAIL_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env;

const CLIENT_ID = `${MAIL_CLIENT_ID}`;
const CLIENT_SECRET = `${MAIL_CLIENT_SECRET}`;
const REFRESH_TOKEN = `${MAIL_REFRESH_TOKEN}`;
const SENDER_MAIL = `${SENDER_EMAIL_ADDRESS}`;

const sendMail = async(to: string, url: string, txt: string) => {
    const oAuth2Client = new OAuth2Client(CLIENT_ID)
}