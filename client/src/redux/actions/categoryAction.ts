import { Dispatch } from "react";
import { ALERT, IAlertType } from "../types/alertType";
import { getDataAPI } from "../../utils/fetchData";
import { GET_CATEGORIES, ICategoryType } from "../types/categoryType";

export const getCategories = () => async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true } })
        const res = await getDataAPI('category');
        dispatch({ type: GET_CATEGORIES, payload: res.data.categories });
        dispatch({ type: ALERT, payload: { loading: false } })

    } catch (error: any) {
        dispatch({ type: ALERT, payload: error.response.data.msg })
    }
}