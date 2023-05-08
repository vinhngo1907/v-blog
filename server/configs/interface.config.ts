import { Document } from 'mongoose';
import { Request } from "express";

export interface IUser extends Document {
    name: string,
    account: string,
    password: string,
    avatar: string,
    role: string,
    type: string,
    rf_token: string,
    _doc: object
}

export interface INewUser {
    name: string,
    account: string,
    password: string
}

export interface IDecodeToken {
    id?: string
    newUser?: INewUser
    iat: number
    exp: number
}

export interface IUserParams {
    name: string 
    account: string 
    password: string
    avatar?: string
    type: string
}  

export interface IReqAuth extends Request {
    user?: IUser
  }