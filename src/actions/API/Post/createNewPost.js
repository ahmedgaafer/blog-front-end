import CONFIG from "../Config";
import { CREATE_NEW_POST } from '../../index';

const URL = CONFIG.URL;

export default function createNewPost(userID, Token, postBody){
    return async function(dispatch){
        
        await fetch(`${URL}post/user/${userID}`, {
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${Token}`
            },
            body: JSON.stringify({text:postBody})
        })
        .then(res=> res.json())
        .then(res =>{
            
            dispatch({
                type: CREATE_NEW_POST,
                post: res
            })
        })

    }
}