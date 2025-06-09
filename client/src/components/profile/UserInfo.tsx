import React from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../../utils/TypeScript";
import NotFound from "../global/NotFound";

export default function UserInfo() {
    const { auth } = useSelector((state: RootStore) => state);
    if (!auth.user) return <NotFound />

    return (
        <form className="profile_info">
            <div className="info_avatar"></div>
            <div className="form-group my-3">
                <label htmlFor="name">Name</label>
            </div>
            <div className="form-group my-3">
                <label htmlFor="account">Account</label>
            </div>
            {
                auth.user.type !== 'register' &&
                <small className="text-danger">
                    * Quick login account with {auth.user.type} can't use this function *
                </small>
            }

            <div className="form-group my-3">
                <label htmlFor="password">Password</label>

                <div className="pass"></div>

            </div>
        </form>
    )
} 