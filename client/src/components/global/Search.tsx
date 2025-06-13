import { useEffect, useState } from "react"
import { IBlog } from "../../utils/TypeScript";
import CardHoriz from "../cards/CardHoriz";
import { useLocation } from "react-router-dom";
import { getDataAPI } from "../../utils/fetchData";

export default function Search() {
    const [search, setSearch] = useState("");
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const { pathname } = useLocation()

    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            if (search.length < 2) return setBlogs([]);

            try {
                const res = await getDataAPI(`blog/search?title=${search}`);
                setBlogs(res.data);
            } catch (error: any) {
                console.log(error);
            }
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [search]);

    useEffect(() => {
        setSearch('');
        setBlogs([]);
    }, [pathname])
    return (
        <div className="search w-100 position-relative me-4">
            <input type="text" className="form-control me-2 w-100"
                placeholder="Enter your search..." value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {
                search.length >= 2 &&
                <div className="position-absolute pt-2 px-1 w-100 rounded"
                    style={{
                        background: '#eee', zIndex: 10,
                        maxHeight: 'calc(100vh - 100px)',
                        overflow: 'auto'
                    }}>
                    {
                        blogs.length
                            ? blogs.map(blog => (
                                <CardHoriz key={blog._id} blog={blog} />
                            ))
                            : <h3 className="text-center">No Blogs</h3>
                    }
                </div>
            }
        </div>
    )
}