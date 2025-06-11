import { useEffect, useState } from "react";
import { showErrMsg } from "../../components/alert/Alert";
import { useParams } from "react-router-dom";
import { IBlog, IParams } from "../../utils/TypeScript";
import { getDataAPI } from "../../utils/fetchData";
import Loading from "../../components/global/Loading";
import DisplayBlog from "../../components/blog/DisplayBlog";

export default function DetailBlog() {
    const id = useParams<IParams>().slug;
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState<IBlog>()

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        getDataAPI(`blog/${id}`)
            .then(res => {
                setBlog(res.data.blog)
                setLoading(false);
            })
            .catch((err: any) => {
                setError(err.response.data.msg);
                setLoading(false);
            });

        return () => setBlog(undefined)
    }, [id]);

    if (loading) return <Loading />;

    return (
        <div className="my-4">
            {error && showErrMsg(error)}
            {blog && <DisplayBlog blog={blog} />}
        </div>
    )
}