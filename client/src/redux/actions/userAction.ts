import { Dispatch } from "react";
import { ALERT, IAlertType } from "../types/alertType";
import { getDataAPI } from "../../utils/fetchData";
import { GET_OTHER_INFO, IGetOtherInfoType } from "../types/profileType";

export const getOtherInfo = (id: string) =>
    async (dispatch: Dispatch<IAlertType | IGetOtherInfoType>) => {
        try {
            dispatch({ type: ALERT, payload: { loading: true } })

            const res = await getDataAPI(`user/${id}`)

            dispatch({
                type: GET_OTHER_INFO,
                payload: res.data
            })

            dispatch({ type: ALERT, payload: {} })

        } catch (err: any) {
            dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
        }
    }