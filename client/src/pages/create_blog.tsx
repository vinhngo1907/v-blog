import { useDispatch, useSelector } from "react-redux"
import { IBlog, IUser, RootStore } from "../utils/TypeScript"
import NotFound from "../components/global/NotFound";
import { useEffect, useRef, useState } from "react";
import CreateForm from "../components/cards/CreateForm";
import ReactQuill from '../components/editor/ReactQuill'
import { validCreateBlog } from "../utils/valid";
import { ALERT } from "../redux/types/alertType";
import { createBlog, updateBlog } from "../redux/actions/blogAction";
import CardHoriz from "../components/cards/CardHoriz";
import { getDataAPI } from "../utils/fetchData";

export default function CreateBlog({ id }: any) {
    const { auth } = useSelector((state: RootStore) => state);
    const initState = {
        user: '',
        title: '',
        content: '',
        description: '',
        thumbnail: '',
        category: '',
        createdAt: new Date().toISOString()
    }
    const [blog, setBlog] = useState<IBlog>(initState);
    const [body, setBody] = useState('');
    const [text, setText] = useState('');
    const divRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const [oldData, setOldData] = useState<IBlog>(initState)

    useEffect(() => {
        if (!id) return;
        getDataAPI(`blog/${id}`).then(res => {
            setBlog(res.data);
            setBody(res.data.content)
            setOldData(res.data)
        }).catch(err => console.log(err))

        const initState = {
            user: '',
            title: '',
            content: '',
            description: '',
            thumbnail: '',
            category: '',
            createdAt: new Date().toISOString()
        }
        return () => {
            setBlog(initState);
            setBody('');
            setOldData(initState);
        }
    }, [id]);

    useEffect(() => {
        const div = divRef.current;
        if (!div) return;

        const text = (div?.innerHTML as string)
        setText(text);
    }, [body]);

    const handleSubmit = async () => {
        if (!auth.access_token) return;
        const check = validCreateBlog({ ...blog, content: text });
        if (check.errLength > 0) {
            return dispatch({ type: ALERT, payload: { errors: check.errMsg } })
        }
        const newData = { ...blog, content: body }
        if (id) {
            if ((blog.user as IUser)._id !== auth.user?._id) {
                return dispatch({
                    type: ALERT,
                    payload: { errors: 'Invalid Authentication.' }
                })
            }
            // const result = await 
            dispatch(updateBlog(newData, auth.access_token))
        } else {
            dispatch(createBlog(newData, auth.access_token))
        }
    }

    if (!auth.access_token) return <NotFound />

    return (
        <div className="my-4 create_blog">
            <div className="row mt-4">
                <div className="col-md-6">
                    <h5>Create</h5>
                    <CreateForm blog={blog} setBlog={setBlog} />
                </div>
                <div className="col-md-6">
                    <h5>Preview</h5>
                    <CardHoriz blog={blog} />
                </div>
            </div>
            <ReactQuill setBody={setBody} body={body} />
            <div ref={divRef} dangerouslySetInnerHTML={{
                __html: body
            }} style={{ display: 'none' }} />

            {/* <small>{text.length}</small> */}
            <button className="btn btn-dark mt-3 d-block mx-auto" onClick={handleSubmit}>
                {id ? 'Update Blog' : 'Create Blog'}
            </button>
        </div>
    )
}