import CONFIG from "../Config";
import { GET_ALL_POSTS } from '../../index';

const URL = CONFIG.URL;

export default function getAllPosts(...args){
    return async function(dispatch){
        
        await fetch(`${URL}/post`)
        .then(res=> res.json())
        .then(res =>{
            dispatch({
                type: GET_ALL_POSTS,
                posts: res
            })
        })

    }
}