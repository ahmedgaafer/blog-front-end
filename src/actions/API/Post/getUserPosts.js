import CONFIG from "../Config";
import { setUserPosts } from "../../index";

const URL = CONFIG.URL;

export default function getUserPosts(skip, userID) {
	return async function (dispatch) {
		await fetch(`${URL}post/user/${userID}?skip=${skip}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((res) => {
				dispatch(setUserPosts({ posts: res, userID }));
			});
	};
}
