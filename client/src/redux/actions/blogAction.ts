import { Dispatch } from "react";
import { ALERT, IAlertType } from "../types/alertType";
import { IGetHomeBlogsType } from "../types/blogType";

export const getHomeLogs = () => (dispatch: Dispatch<IAlertType | IGetHomeBlogsType>) => {
    try {
        
    } catch (error: any) {
        dispatch({ type: ALERT, payload: error.response.data.msg })
    }
}