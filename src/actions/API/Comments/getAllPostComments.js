import { GET_ALL_POST_COMMENTS } from "../../index";
import CONFIG from "../Config";

const URL = CONFIG.URL;

export default function getAllPostComments(post_id){
    return async function(dispatch){

        await fetch(`${URL}comment/post/${post_id}`)
        .then(res => res.json())
        .then(res =>{
            
            dispatch({
                type: GET_ALL_POST_COMMENTS,
                comments: { [`${post_id}`] : [...res.comments]}
            })
        })
    }
}