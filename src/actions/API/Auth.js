import { LOGIN } from "../index";

export function userLogin(user){
    return {
        type: LOGIN,
        ...user
    }
}

export function login({email, password}){
    const URL = "https://blog-back-end-nodejs.herokuapp.com/api";

    return async function(dispatch){
   
        await fetch(URL + "auth/signin", {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email, password})
        })
        .then(res => {
            if (res.status === 400)throw new Error('Server Error');
            if (res.status === 404)throw new Error('Not Found');
            return res.json();
        })
        .then(res => { 
            dispatch(userLogin({code:200,user:res}));
         })
        .catch(err => { return {code:400, err} });
        return;
    }
}