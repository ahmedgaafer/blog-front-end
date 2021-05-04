import CONFIG from "../Config";
import { deletePost } from '../../index';

const URL = CONFIG.URL;

export default function deleteUserPost(postID, userID, Token){
    return async function(dispatch){

        await fetch(`${URL}post/${postID}/user/${userID}`, {
            method: "DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${Token}`
            },
            
        })
        .then(res=> res.json())
        .then(res =>{
            dispatch(deletePost(postID)) 
        })

    }
}