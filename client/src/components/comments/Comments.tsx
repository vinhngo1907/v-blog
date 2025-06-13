import React from "react"
import { IComment } from "../../utils/TypeScript"

interface IProps {
    comment: IComment
}
const Comments: React.FC<IProps> = ({ comment }) => {
    return (
         <div className="my-3 d-flex">{comment.content}</div>
    )
}

export default Comments