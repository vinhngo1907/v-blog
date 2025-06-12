import { useDispatch, useSelector } from "react-redux"
import { FormSubmit, ICategory, RootStore } from "../utils/TypeScript"
import NotFound from "../components/global/NotFound";
import { useEffect, useState } from "react";
import { ALERT } from "../redux/types/alertType";
import { createCategory, deleteCategory, updateCategory } from "../redux/actions/categoryAction";

export default function Category() {
    const { auth, categories } = useSelector((state: RootStore) => state);
   
    const [name, setName] = useState('');
    const [edit, setEdit] = useState<ICategory | null>(null);
    const dispatch =useDispatch();
    const handleDelete = (id: string) => {
        if(!id || !auth.access_token) return;
        dispatch(deleteCategory(id, auth.access_token));
    }

    useEffect(() => {
        if (edit) setName(edit.name);
    }, [edit]);

     const handleSubmit = async (e: FormSubmit) => {
        e.preventDefault();
        if(!auth.access_token) return;

        dispatch({type:ALERT, payload: {loading: true}})
        if(edit){
            if(edit.name === name) return;
            const data = {...edit, name};
            dispatch(updateCategory(data, auth.access_token));
        } else{
            dispatch(createCategory(name, auth.access_token));
        }
        dispatch({type:ALERT, payload: {loading: false}})
    }

    if (!auth.access_token) return <NotFound />
    return (
        <div className="category">
            <form onSubmit={handleSubmit}>
                <label htmlFor="category">Category</label>

                <div className="d-flex align-items-center">
                    {
                        edit && <i style={{ cursor: 'pointer' }}
                            className="fas fa-times me-2 text-danger"
                            onClick={(e) => setEdit(null)} />
                    }
                    <input
                        type="text" name="category" value={name}
                        id="category"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button type="submit">{edit ? 'Update' : 'Create'}</button>
                </div>
            </form>
            <div>
                {
                    categories.map(category => (
                        <div className="category_row" key={category._id}>
                            <p className="m-0 text-capitalize">{category.name}</p>

                            <div>
                                <i className="fas fa-edit mx-2"
                                    onClick={() => setEdit(category)} />
                                <i className="fas fa-trash-alt"
                                    onClick={() => handleDelete(category._id)} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
} 