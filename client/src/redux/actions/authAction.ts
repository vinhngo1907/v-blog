import { Dispatch } from "react";
import { AUTH, IAuthType } from "../types/authType";
import { ALERT, IAlertType } from "../types/alertType";
import { IUserLogin } from "../../utils/TypeScript";
import { getDataAPI, postDataAPI } from "../../utils/fetchData";
import { checkTokenExp } from "../../utils/checkTokenExp";

export const login = (userLogin: IUserLogin) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true } });
        const result = await postDataAPI('login', userLogin, null);
        dispatch({ type: AUTH, payload: result.data });
        dispatch({ type: ALERT, payload: { loading: false } });
        localStorage.setItem("logged", "v-dev");
    } catch (error: any) {
        dispatch({ type: ALERT, payload: error.response.data.msg })
    }
}

export const refresh = () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const logged = localStorage.getItem("logged");
    if (logged !== 'v-dev') return;

    try {
        const res = await getDataAPI('refresh_token');
        dispatch({ type: AUTH, payload: res.data });
        dispatch({ type: ALERT, payload: {} })
    } catch (error: any) {
        dispatch({ type: ALERT, payload: error.response.data.msg })
    }
}

export const logout = (token: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
        localStorage.removeItem('logged');
        dispatch({ type: AUTH, payload: {} });
        await postDataAPI("logout", null, access_token);
    } catch (error: any) {
        dispatch({ type: ALERT, payload: error.response.data.msg });
    }
}