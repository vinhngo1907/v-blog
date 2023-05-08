
import { Request } from "express";
const {
    ACTIVE_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET
} = process.env;

import jwt from "jsonwebtoken";

export const createAccessToken = (payload: object) => {
    return jwt.sign(payload, `${ACCESS_TOKEN_SECRET}`, { expiresIn: '15m' });
}

export const createRefreshToken = (payload: object, res: Request) => {
    const refresh_token = jwt.sign(payload, `${REFRESH_TOKEN_SECRET}`, { expiresIn: '1d' });
    res.cookies('refreshToken', refresh_token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        path: 'api/auth/refresh-token',
        httpOnly: true
    })
    return refresh_token
}

export const createActiveToken = (payload: object) => {
    return jwt.sign(payload, `${ACTIVE_TOKEN_SECRET}`, { expiresIn: '5m' });
}