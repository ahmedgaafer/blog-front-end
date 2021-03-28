import { GET_ALL_POSTS, CREATE_NEW_POST } from "../actions"

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
        case CREATE_NEW_POST:
            const posts = [...newState.posts, action.post]
            return {
                ...newState,
                posts
            }
        default:
            return {
                ...newState,
            }
    }
}