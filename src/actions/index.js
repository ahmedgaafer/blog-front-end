export const CREATE_NEW_USER = "CREATE_NEW_USER";
export const LOGIN = "LOGIN";
export const REMOVE_USER = "REMOVE_USER";

export function createNewUser(user){
    return {
        type: CREATE_NEW_USER,
        user,
    }
}

export function login(cred){
    return{
        type: LOGIN,
        cred
    }
}

export function removeUser(cred){
    return {
        type: REMOVE_USER,
        cred
    }
}