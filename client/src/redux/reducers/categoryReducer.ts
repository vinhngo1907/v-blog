import { ICategory } from "../../utils/TypeScript";
import * as types from '../types/categoryType'

export default function categoryReducer(
    state: ICategory[] = [],
    action: types.ICategoryType): ICategory[] {
    switch (action.type) {
        case types.GET_CATEGORIES:
            return action.payload;
        case types.CREATE_CATEGORY:
            return [action.payload, ...state];
        case types.UPDATE_CATEGORY:
            const newCategory = action.payload;
            return state.map((item) => item._id === newCategory._id ? {
                ...item, name: newCategory.name
            } : item);
        case types.DELETE_CATEGORY:
            return state.filter(item => item._id !== action.payload);
        default:
            return state;
    }
}