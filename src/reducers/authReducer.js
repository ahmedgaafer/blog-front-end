import { CREATE_NEW_USER, LOGIN, REMOVE_USER } from "../actions";

let initialState = {
    id:"",
    username:"",
    profileImageUrl:"",
    token:"",
    isLogged:false,
}

export default  function authReducer(state = initialState, action){
    
    let newState = {...state};
    switch(action.type){
        case CREATE_NEW_USER:
            return {
                ...newState,
            }
        case LOGIN:
            
            if(action.code === 200){
                localStorage.setItem("userToken", action.user.token);
                localStorage.setItem("userID", action.user.id);
                localStorage.setItem("userImageUrl", action.user.profileImageUrl);
                localStorage.setItem("username", action.user.username);
                return{
                    ...newState,
                    ...action.user,
                    isLogged:true
                }; 
            }
            else{
                return{
                    ...newState
                };
            }
        case REMOVE_USER:
            return{
                ...newState
            }
        default:
            if(localStorage.getItem("userToken")){
                initialState.token = localStorage.getItem("userToken");
                initialState.id = localStorage.getItem("userID");
                initialState.profileImageUrl = localStorage.getItem("userImageUrl");
                initialState.username = localStorage.getItem("username");
                initialState.isLogged = true;
            }

            return newState;
    }
}
