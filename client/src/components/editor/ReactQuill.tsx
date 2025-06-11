import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';

interface IProps {
    setBody: (value: string) => void,
    body: string
}
const Quill: React.FC<IProps> = ({ body, setBody }) => {
    const modules = { toolbar: { container } }
    const dispatch = useDispatch();
    const quillRef = useRef<ReactQuill>(null)

    return (
        <div>
            {/* <ReactQuill 
            theme="snow"
                modules={modules}
                placeholder="Write somethings..."
                onChange={e => setBody(e)}
                value={body}
                ref={quillRef} 
                /> */}
        </div>
    )
}

let container = [
    [{ 'font': [] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript

    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'align': [] }],

    ['clean', 'link', 'image', 'video']
];

export default Quill