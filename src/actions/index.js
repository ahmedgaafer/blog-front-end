//#region Auth
export const CREATE_NEW_USER = "CREATE_NEW_USER";
export const LOGIN = "LOGIN";
export const REMOVE_USER = "REMOVE_USER";

export function userLogin(user) {
  return {
    type: LOGIN,
    ...user,
  };
}

export function userRegister(user) {
  return {
    type: CREATE_NEW_USER,
    ...user,
  };
}

//#endregion


//#region Posts
export const GET_ALL_POSTS = "GET_ALL_POSTS"

export function getAllPosts(posts){
  return {
    type: GET_ALL_POSTS,
    posts
  }
}
//#endregion

//#region Comments
export const GET_ALL_POST_COMMENTS="GET_ALL_POST_COMMENTS"

export function getAllPostComments(comments){
  return {
    type: GET_ALL_POST_COMMENTS,
    comments
  }
}

//#endregion