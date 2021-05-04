import { GET_ALL_POST_COMMENTS, CREATE_NEW_COMMENT } from "../actions"

const initialState = {
    comments: []
}

export default function postReducer(state = initialState, action) {

    
    let newState = {...state}
    
    switch(action.type){
        case GET_ALL_POST_COMMENTS:
            return {
                ...newState,
                comments: [...newState.comments, ...action.comments],
            }
        case CREATE_NEW_COMMENT:
            const newComments = [ ...newState.comments, ...action.comment]
            return {
                ...newState,
                comments: newComments,
            }
        default:
            return newState;
    }
}