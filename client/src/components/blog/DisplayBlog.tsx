import React, { useEffect, useState } from "react";
import { IBlog, IComment, RootStore } from "../../utils/TypeScript";
import { useSelector } from "react-redux";
import Loading from "../global/Loading";
import Comments from "../comments/Comments";
import Input from "../comments/Input";
import { Link } from "react-router-dom";

interface IProps {
    blog: IBlog
}

const DisplayBlog: React.FC<IProps> = ({ blog }) => {
    const { auth, comments } = useSelector((state: RootStore) => state);
    const [showComments, setShowComments] = useState<IComment[]>([]);
    const [loading, setLoading] = useState(false);
    const handleComment = (body: string) => {
        if (!auth.access_token) return;

    }
    useEffect(() => {
        if (!blog._id) return;
    }, [blog._id]);

    useEffect(() => {
        setShowComments(comments.data);
    }, [comments.data]);

    return (
        <div>
            <h2 className="text-center my-3 text-capitalize fs-1"
                style={{ color: '#ff7a00' }}>
                {blog.title}
            </h2>
            <div className="text-end fst-italic" style={{ color: 'teal' }}>
                <small>{typeof (blog.user) !== "string" && `By: ${blog.user.name}`}</small>
                <small className="ms-2">
                    {new Date(blog.createdAt).toLocaleString()}
                </small>
            </div>
            <div dangerouslySetInnerHTML={{
                __html: blog.content
            }} />

            <hr className="my-1" />
            <h3 style={{ color: '#ff7a00' }}>✩ Comments ✩</h3>
            {
                auth.user
                    ? <Input callback={handleComment}/>
                    : <h5>
                        Please <Link to={`/login?blog/${blog._id}`}>login</Link> to comment.
                    </h5>
            }
            {
                loading
                    ? <Loading />
                    : showComments?.map((comment, index) => (
                        <Comments key={index} comment={comment} />
                    ))
            }
            {/* Pagination */}
        </div>
    )
}

export default DisplayBlog;