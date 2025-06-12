import { Dispatch } from "react";
import { ALERT, IAlertType } from "../types/alertType";
import { getDataAPI, patchDataAPI, postDataAPI, deleteDataAPI } from "../../utils/fetchData";
import { CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORIES, ICategoryType, ICreateCategory, IUpdateCategory, UPDATE_CATEGORY } from "../types/categoryType";
import { checkTokenExp } from "../../utils/checkTokenExp";
import { ICategory } from "../../utils/TypeScript";

export const getCategories = () => async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true } })
        const res = await getDataAPI('category');
        dispatch({ type: GET_CATEGORIES, payload: res.data.categories });
        dispatch({ type: ALERT, payload: { loading: false } })

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
}

export const createCategory =
    (name: string, token: string) => async (dispatch: Dispatch<IAlertType | ICreateCategory>) => {
        const result = await checkTokenExp(token, dispatch);
        const access_token = result ? result : token;
        try {
            dispatch({ type: ALERT, payload: { loading: true } })
            const res = await postDataAPI('category', { name }, access_token);
            dispatch({ type: CREATE_CATEGORY, payload: res.data.category });
            dispatch({ type: ALERT, payload: { loading: false } })
        } catch (error: any) {
            dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
        }
    }

export const updateCategory = (data: ICategory, token: string) => async (dispatch: Dispatch<IAlertType | IUpdateCategory>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
        dispatch({ type: ALERT, payload: { loading: true } })
        const res = await patchDataAPI(`category/${data._id}`, {
            name: data.name
        }, access_token);
        dispatch({ type: UPDATE_CATEGORY, payload: res.data.category });
        dispatch({ type: ALERT, payload: { loading: false } })
    } catch (error: any) {
        dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
}

export const deleteCategory = (id: string, token: string) => async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
        dispatch({ type: ALERT, payload: { loading: true } })
        const res = await deleteDataAPI(`category/${id}`, access_token);
        dispatch({ type: DELETE_CATEGORY, payload: res.data.categories });
        dispatch({ type: ALERT, payload: { loading: false } })

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
}