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

export interface IAlert {
    loading?: boolean
    success?: string | string[]
    errors?: string | string[]
}
