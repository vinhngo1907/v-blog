import React, { useEffect } from "react";
import { RootStore } from "../../utils/TypeScript";
import { useSelector } from "react-redux";
import NotFound from "../global/NotFound";

interface IProps {
    id: string
}
const OtherInfo: React.FC<IProps> = ({ id }) => {
    useEffect(() => {
        if (!id) return
    }, [id])

    const { auth } = useSelector((state: RootStore) => state);
    if (!auth.access_token) return <NotFound />

    return (
        <div className="profile_info text-center rounded">
            <div className="info_avatar"></div>
        </div>
    )
}

export default OtherInfo;