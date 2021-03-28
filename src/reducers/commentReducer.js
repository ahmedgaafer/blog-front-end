import { GET_ALL_POST_COMMENTS } from "../actions"

const initialState = {
   comments: {}
}

export default function postReducer(state = initialState, action) {

    
    let newState = {...state}
    
    switch(action.type){
        case GET_ALL_POST_COMMENTS:
            return {
                ...newState,
                comments: {...newState.comments, ...action.comments},
            }
        default:
            return {
                ...newState,
            }
    }
}