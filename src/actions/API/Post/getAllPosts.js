import CONFIG from "../Config";
import { getPosts } from "../../index";

const URL = CONFIG.URL;

export default function getAllPosts(skip, userID) {
	return async function (dispatch) {
		console.log(userID);
		await fetch(`${URL}post?skip=${skip}&f=${userID}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((res) => {
				dispatch(getPosts(res));
			});
	};
}
