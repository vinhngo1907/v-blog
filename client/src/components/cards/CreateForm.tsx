import React, { useState } from "react";
import { IBlog, RootStore } from "../../utils/TypeScript";
import { useSelector } from "react-redux";

interface IProps {
    blog: IBlog,
    setBlog: (blog: IBlog) => void
}

const CreateForm: React.FC<IProps> = ({ blog, setBlog }) => {
    const { categories } = useSelector((state: RootStore) => state);
    const handleChangeInput = (e: any) => {
        setBlog({ ...blog, [e.target.name]: e.taget.value })
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group position-relative">
                <input type="text" value={blog.title} className="form-control" name="title"
                    onChange={handleChangeInput}
                />
                <small className="text-muted position-absolute"
                    style={{ bottom: 0, right: '3px', opacity: '0.3' }}>
                    {blog.title.length}/50
                </small>
            </div>
            <div className="form-group my-3">
                <input type="file" className="form-control" accept="image/*" />
            </div>
            <div className="form-group position-relative">
                <textarea
                    className="form-control" rows={4} name="description"
                    value={blog.description} onChange={handleChangeInput}
                />
                <small className="text-muted position-absolute"
                    style={{ bottom: 0, right: '3px', opacity: '0.3' }}>
                    {blog.description.length}/200
                </small>
            </div>
            <div className="form-group my-3">
                <select className="form-control text-capitalize"
                    value={blog.category} name="category"
                    onChange={handleChangeInput}>
                    <option value="">Choose a category</option>
                    {
                        categories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>
        </form>
    )
}

export default CreateForm;