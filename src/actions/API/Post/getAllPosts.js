import CONFIG from "../Config";
import { getPosts } from '../../index';

const URL = CONFIG.URL;

export default function getAllPosts(skip){
    return async function(dispatch){
        
        await fetch(`${URL}/post`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({skip}),
        })
        .then(res=> res.json())
        .then(res =>{
            dispatch(getPosts(res))
        })

    }
}