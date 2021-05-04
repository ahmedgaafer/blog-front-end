import { getAllComments } from "../../index";
import CONFIG from "../Config";

const URL = CONFIG.URL;

export default function getAllPostComments(post_id){
    return async function(dispatch){

        await fetch(`${URL}comment/post/${post_id}`)
        .then(res => res.json())
        .then(res =>{ 
            dispatch(getAllComments(res.comments))
        })
    }
}