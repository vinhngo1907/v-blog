import { IBlog } from '../../utils/TypeScript'

export const GET_HOME_BLOGS = "GET_HOME_BLOGS"
export const GET_BLOGS_CATEGORY_ID = "GET_BLOGS_CATEGORY_ID"
export const GET_BLOGS_USER_ID = "GET_BLOGS_USER_ID"
export const CREATE_BLOGS_USER_ID = "CREATE_BLOGS_USER_ID"
export const DELETE_BLOGS_USER_ID = "DELETE_BLOGS_USER_ID"


export interface IGetHomeBlogsType {
    type: typeof GET_HOME_BLOGS
    payload: IBlogsHome[]
}

export interface IBlogsHome {
    _id: string
    name: string
    count: number
    blogs: IBlog[]
}

export interface IBlogsUser {
    id: string
    blogs: IBlog[]
    search: string
    total: number

}

export interface IBlogsCategory {

}

export interface IGetBlogsCategoryType {

}