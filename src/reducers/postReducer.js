import _ from "lodash"
import { SET_POSTS,
        CREATE_NEW_POST,
        DELETE_USER_POST,
        UPDATE_USER_POST,
        SET_USER_POSTS,
        CLEAN_NUMBER_OF_LOADED_POST,
        } from "../actions"

const initialState = {
    posts: [],
    profilePosts: [],
    loaded: 0,
}

export default function postReducer(state = initialState, action) {
    let newPosts = [];
    let ids=0;
    let filtered=0;
    
    switch(action.type){
        case SET_POSTS:
            newPosts = [...state.posts, ...action.posts]
            ids = newPosts.map(o => o._id)
            filtered = newPosts.filter(({_id}, index) => !ids.includes(_id, index + 1))
                .sort((a,b) => (a.createdAt > b.createdAt) ? -1 : ((b.createdAt > a.createdAt) ? 1 : 0))
            return {
                ...state,
                posts: filtered,
                loaded: filtered.length,
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
        case SET_USER_POSTS:
            
            newPosts = [...state.profilePosts, ...action.payload.posts]
            ids = newPosts.map(o => o._id)
            filtered = newPosts.filter(({_id}, index) => !ids.includes(_id, index + 1) || _id === action.payload.useID)
                .sort((a,b) => (a.createdAt > b.createdAt) ? -1 : ((b.createdAt > a.createdAt) ? 1 : 0))
            return {
                ...state,
                profilePosts: filtered,
                loaded: filtered.length,
            }
        case CLEAN_NUMBER_OF_LOADED_POST:
            return{
                ...state,
                loaded: 0,
                profilePosts: newPosts,
                posts: newPosts,
            }
        default:
            return state;        
    }
}