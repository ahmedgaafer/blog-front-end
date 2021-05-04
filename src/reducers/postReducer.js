import _ from "lodash"
import { SET_POSTS, CREATE_NEW_POST, DELETE_USER_POST, UPDATE_USER_POST } from "../actions"

const initialState = {
    posts: []
}

export default function postReducer(state = initialState, action) {
    let newPosts = [];
    switch(action.type){
        case SET_POSTS:
            return {
                ...state,
                posts: action.posts,
            }
        case CREATE_NEW_POST:
            const posts = [action.post, ...state.posts]
            return {
                ...state,
                posts
            }
        case DELETE_USER_POST:
            newPosts = [...state.posts]
            _.remove(newPosts, post => post._id === action.id);
            
            return {
                ...state,
                posts: newPosts,
            }
        case UPDATE_USER_POST:
            newPosts = [...state.posts];
            newPosts[action.payload.index].text = action.payload.text

            return {
                ...state,
                posts: newPosts,
            };        

        default:
            return state;        
    }
}