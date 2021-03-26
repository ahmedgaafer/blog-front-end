import { userRegister } from "../../index";
import CONFIG from "../Config";

const URL = CONFIG.URL;

export default function register({ username, email, password}){
    return async function (dispatch){
      await fetch(URL + "auth/signup", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })
      .then((res) => {
        if (res.status === 400) throw new Error("Server Error");
        if (res.status === 404) throw new Error("Not Found");
        return res.json();
      })
      .then((res) => {
        dispatch(userRegister({ code: 200, user: res }));
      })
      .catch((err) => {
        return { code: 400, err };
      });
    }
  }