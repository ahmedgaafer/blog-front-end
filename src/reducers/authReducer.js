import { CREATE_NEW_USER, LOGIN, LOGOUT, REMOVE_USER } from "../actions";

let initialState = {
  id: "",
  username: "",
  profileImageUrl: "",
  token: "",
  isLogged: false,
};

function setLocalStorage({token, id, profileImageUrl, username}) {
 
  localStorage.setItem("userToken", token);
  localStorage.setItem("userID", id);
  localStorage.setItem("userImageUrl", profileImageUrl);
  localStorage.setItem("username", username);
}

export default function authReducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case CREATE_NEW_USER:

      setLocalStorage(action.user)
      return {
        ...newState,
        ...action.user,
        isLogged: true,
      };
    case LOGIN:
      if (action.code === 200) {
        
        setLocalStorage(action.user)
        return {
          ...newState,
          ...action.user,
          isLogged: true,
        };
      } else {
        return {
          ...newState,
        };
      }
    case LOGOUT:
      localStorage.clear();
      return {};
    case REMOVE_USER:
      return {
        ...newState,
      };
    default:
      if (localStorage.getItem("userToken")) {
        initialState.token = localStorage.getItem("userToken");
        initialState.id = localStorage.getItem("userID");
        initialState.profileImageUrl = localStorage.getItem("userImageUrl");
        initialState.username = localStorage.getItem("username");
        initialState.isLogged = true;
      }

      return newState;
  }
}
