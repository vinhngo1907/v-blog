import { useDispatch, useSelector } from "react-redux";
import { IBlog, IParams, RootStore } from "../../utils/TypeScript";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Loading from "../../components/global/Loading";
import CardVert from "../../components/cards/CardVert";
import { getBlogsByCategoryId } from "../../redux/actions/blogAction";

const BlogsByCategory = () => {
	const { categories, blogsCategory } = useSelector((state: RootStore) => state);
	const dispatch = useDispatch();
	const { slug } = useParams<IParams>();
	const history = useHistory();
	const { search } = history.location;
	const [categoryId, setCategoryId] = useState('');
	const [blogs, setBlogs] = useState<IBlog[]>([]);

	useEffect(() => {
		console.log({ slug, categories })
		const category = categories.find(cate => cate.name.toLowerCase() === slug);
		if (slug) setCategoryId(String(category?._id));
	}, [slug, categories]);

	useEffect(() => {
		if (!categoryId) return;

		if (blogsCategory.every(item => item.id !== categoryId)) {
			dispatch(getBlogsByCategoryId(categoryId, search))
		} else {
			const data = blogsCategory.find(item => item.id === categoryId)
			if (!data) return;
			setBlogs(data.blogs)
			//   setTotal(data.total)

			if (data.search) history.push(data.search)
		}
	}, [categoryId, blogsCategory, dispatch, search, history]);

	if (!blogs) return <Loading />;
	return (
		<div className="blogs_category">
			<div className="show_blogs">
				{
					blogs.map((blog) => (
						<CardVert blog={blog} key={blog._id} />
					))
				}
			</div>
			{/* Pagination */}
		</div>
	)
}

export default BlogsByCategory;