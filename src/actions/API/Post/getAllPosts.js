import CONFIG from "../Config";
import { getPosts } from '../../index';

const URL = CONFIG.URL;

export default function getAllPosts(...args){
    return async function(dispatch){
        
        await fetch(`${URL}/post`)
        .then(res=> res.json())
        .then(res =>{
            dispatch(getPosts(res))
        })

    }
}