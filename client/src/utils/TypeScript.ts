import { ChangeEvent, FormEvent } from 'react'
import rootReducer from '../redux/reducers/index'

export type InputChange = ChangeEvent<
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement
>

export type FormSubmit = FormEvent<HTMLFormElement>

export type RootStore = ReturnType<typeof rootReducer>


export interface IParams {
    page: string
    slug: string
}

export interface IUserLogin {
    account: string
    password: string
}

export interface IUserRegister extends IUserLogin {
    name: string
    cf_password: string
}

export interface IUser extends IUserLogin {
    avatar: string
    createdAt: string
    name: string
    role: string
    type: string
    updatedAt: string
    _id: string
}

export interface IUser extends IUserRegister {
    name: string
    type: string
    updatedAt: string
    password: string
    cf_password: string
}

export interface IAlert {
    loading?: boolean
    success?: string | string[]
    errors?: string | string[]
}

export interface IBlog {
    _id?: string,
    user: string | IUser
    title: string
    content: string
    description: string
    // category: string | ICategory
    thumbnail: string | File
    createdAt: string
}

export interface ICategory {
    _id: string
    name: string
    createdAt: string
    updatedAt: string
}