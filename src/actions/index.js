//#region Auth
export const CREATE_NEW_USER = "CREATE_NEW_USER";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REMOVE_USER = "REMOVE_USER";

export function userLogin(user) {
  return {
    type: LOGIN,
    ...user,
  };
}

export function userLogout() {
  return {
    type: LOGOUT,
    user: {
      id: "",
      username: "",
      profileImageUrl: "",
      token: "",
      isLogged: false,
    }
  }
}

export function userRegister(user) {
  return {
    type: CREATE_NEW_USER,
    ...user,
  };
}

//#endregion

//#region Posts
export const SET_POSTS = "SET_ALL_POSTS";
export const CREATE_NEW_POST = "CREATE_NEW_POST";
export const DELETE_USER_POST = "DELETE_USER_POST";
export const UPDATE_USER_POST = "UPDATE_USER_POST";
export const GET_NEXT_POST_BATCH = "GET_NEXT_POST_BATCH";
export const SET_USER_POSTS = "SET_USER_POSTS";
export const CLEAN_NUMBER_OF_LOADED_POST = "CLEAN_NUMBER_OF_LOADED_POST";

export function getPosts(posts){
  return {
    type: SET_POSTS,
    posts
  }
}

export function createPost(post){
  return {
    type: CREATE_NEW_POST,
    post
  }
}

export function deletePost(id){
  return {
    type: DELETE_USER_POST,
    id
  }
}

export function updatePost(payload){
  return{
    type: UPDATE_USER_POST,
    payload
  }
}

export function getNextPost(offset){
  return{
    type: GET_NEXT_POST_BATCH,
    offset
  }
}

export function setUserPosts(payload){
  return {
    type: SET_USER_POSTS,
    payload
  }
}

export function cleanNumberOfLoadedPosts(){
  return{
    type: CLEAN_NUMBER_OF_LOADED_POST
  }
}

//#endregion

//#region Comments
export const GET_ALL_POST_COMMENTS = "GET_ALL_POST_COMMENTS"
export const CREATE_NEW_COMMENT = "CREATE_NEW_COMMENT";

export function getAllComments(comments){
  return {
    type: GET_ALL_POST_COMMENTS,
    comments
  }
}

export function createNewComment(comment){
  return {
    type: CREATE_NEW_COMMENT,
    comment
  }
}

//#endregion