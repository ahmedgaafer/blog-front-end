import { createNewComment as createComment } from "../../index";
import CONFIG from "../Config";

const URL = CONFIG.URL;

export default function createNewComment(body, postID, userID, Token){
    return async function(dispatch){
        
        

        await fetch(`${URL}comment/post/${postID}/user/${userID}`,{
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${Token}`
            },
            body: JSON.stringify({text: body})
        })
        .then(res => res.json())
        .then(res =>{   
            if(res && !res.error) dispatch(createComment(res))   
            else throw new Error('Internal Server Error: cannot create comment')
        })
        .catch(err => {
            console.log(err)
        })
    }
}