import CONFIG from "../Config";
import { updatePost } from '../../index';

const URL = CONFIG.URL;

export default function editUserPost(text, postID, userID, Token){
    return async function(dispatch, index){

        await fetch(`${URL}post/${postID}/user/${userID}`, {
            method: "PUT",
            body: JSON.stringify({text}),
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${Token}`
            },
            
        })
        .then(res=> res.json())
        .then(res =>{
            dispatch(updatePost({postID, text: res.text, index})) 
        })

    }
}