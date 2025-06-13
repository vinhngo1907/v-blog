import { Dispatch } from "react";
import { ALERT, IAlertType } from "../types/alertType";
import { CREATE_BLOGS_USER_ID, GET_BLOGS_CATEGORY_ID, GET_BLOGS_USER_ID, GET_HOME_BLOGS, ICreateBlogsUserType, IGetBlogsCategoryType, IGetBlogsUserType, IGetHomeBlogsType, } from "../types/blogType";
import { getDataAPI, patchDataAPI, postDataAPI } from "../../utils/fetchData";
import { IBlog } from "../../utils/TypeScript";
import { checkTokenExp } from "../../utils/checkTokenExp";
import { imageUpload } from "../../utils/imageUpload";

export const getHomeLogs = () => async (dispatch: Dispatch<IAlertType | IGetHomeBlogsType>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true } });
        const res = await getDataAPI("blog/home");
        dispatch({ type: GET_HOME_BLOGS, payload: res.data.blogList });
        dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error: any) {
        dispatch({ type: ALERT, payload: error.response.data.msg })
    }
}

export const createBlog = (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType | ICreateBlogsUserType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    let url;
    try {
        if (typeof (blog.thumbnail) !== 'string') {
            const photo = await imageUpload(blog.thumbnail);
            url = photo.url;
        } else {
            url = blog.thumbnail;
        }
        const newBlog = { ...blog, thumbnail: url };

        dispatch({ type: ALERT, payload: { loading: true } });

        const res = await postDataAPI('blog', newBlog, access_token);

        dispatch({ type: CREATE_BLOGS_USER_ID, payload: res.data });

        dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (error: any) {
        dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
}

export const updateBlog = (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType | ICreateBlogsUserType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    let url;
    try {
        if (typeof (blog.thumbnail) !== 'string') {
            const photo = await imageUpload(blog.thumbnail);
            url = photo.url;
        } else {
            url = blog.thumbnail;
        }
        const newBlog = { ...blog, thumbnail: url };

        dispatch({ type: ALERT, payload: { loading: true } });

        const res = await patchDataAPI('blog', newBlog, access_token);

        dispatch({ type: CREATE_BLOGS_USER_ID, payload: res.data });

        dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (error: any) {
        dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
}

export const getBlogsByUserId = (id: string, search: string) => async (dispatch: Dispatch<IAlertType | IGetBlogsUserType>) => {
    try {
        let limit = 3;
        let value = search ? search : `?page=${1}`;

        dispatch({ type: ALERT, payload: { loading: true } });
        const res = await getDataAPI(`blog/${id}/user${value}&limit=${limit}`);
        dispatch({
            type: GET_BLOGS_USER_ID, payload: {
                ...res.data, id, search
            }
        })
        dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error: any) {
        dispatch({ type: ALERT, payload: error.response.data.msg })
    }
}

export const getBlogsByCategoryId = (id: string, search?: string) => async (dispatch: Dispatch<IAlertType | IGetBlogsCategoryType>) => {
    try {
        let limit = 8;
        let value = search ? search : `?page=${1}`;
        console.log({id,value})

        dispatch({ type: ALERT, payload: { loading: true } });

        const res = await getDataAPI(`blog/category/${id}${value}&limit=${limit}`)
console.log(res.data)
        dispatch({
            type: GET_BLOGS_CATEGORY_ID,
            payload: { ...res.data, id, search }
        })

        dispatch({ type: ALERT, payload: { loading: false } });

    } catch (error: any) {
        dispatch({ type: ALERT, payload: error.response.data.msg })
    }
}