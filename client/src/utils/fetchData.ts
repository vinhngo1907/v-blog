import axios from "axios";

export const getDataAPI = (url: string, token?: string) => {
    return axios.get(`/api/${url}`, {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const postDataAPI = (url: string, post?: any, token?: string | null) => {
    return axios.post(`/api/${url}`, post, {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const patchDataAPI = (url: string, post: any, token?: string) => {
    return axios.patch(`/api/${url}`, post, {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const putDataAPI = (url: string, post: any, token?: string) => {
    return axios.put(`/api/${url}`, post, {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const deleteDataAPI = (url: string, token?: string) => {
    return axios.delete(`/api/${url}`, {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}