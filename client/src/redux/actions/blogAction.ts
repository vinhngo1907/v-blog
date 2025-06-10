import { Dispatch } from "react";
import { ALERT, IAlertType } from "../types/alertType";
import { GET_HOME_BLOGS, IGetHomeBlogsType } from "../types/blogType";
import { getDataAPI } from "../../utils/fetchData";

export const getHomeLogs = () => async (dispatch: Dispatch<IAlertType | IGetHomeBlogsType>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true } });
        const res = await getDataAPI("blog/home");
        console.log(res.data)
        dispatch({ type: GET_HOME_BLOGS, payload: res.data.blogList });
        dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error: any) {
        dispatch({ type: ALERT, payload: error.response.data.msg })
    }
}