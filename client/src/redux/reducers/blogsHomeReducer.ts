// import { IBlog } from '../../utils/TypeScript';
import { GET_HOME_BLOGS, IGetHomeBlogsType, IBlogsHome } from '../types/blogType'


const blogsHomeReducer = (state: IBlogsHome[] = [], action: IGetHomeBlogsType): IBlogsHome[] => {
	switch (action.type) {
		case GET_HOME_BLOGS:
			return action.payload;
		default:
			return state;
	}
}

export default blogsHomeReducer;