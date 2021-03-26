import { GET_ALL_POSTS } from "../actions"

const initialState = {
    posts: []
}

export default function postReducer(state = initialState, action) {

    
    let newState = {...state}
    
    switch(action.type){
        case GET_ALL_POSTS:
            return {
                ...newState,
                posts: [...action.posts],
            }
        default:
            return {
                ...newState,
            }
    }
}