import { GET_BLOGS_CATEGORY_ID, IBlogsCategory, IGetBlogsCategoryType } from "../types/blogType"

const blogsCategoryReducer = (state: IBlogsCategory[] = [], action: IGetBlogsCategoryType): IBlogsCategory[] => {
    switch (action.type) {
        case GET_BLOGS_CATEGORY_ID:
            if (state.every(item => item.id !== action.payload.id)) {
                return [...state, action.payload]
            } else {
                return state.map(item => item.id === action.payload.id ? action.payload : item)
            }

        default:
            return state
    }
}

export default blogsCategoryReducer