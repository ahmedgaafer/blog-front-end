import CONFIG from "../Config";
import { getPosts } from "../../index";

const URL = CONFIG.URL;

export default function getAllPosts(skip) {
	return async function (dispatch) {
		await fetch(`${URL}post?skip=${skip}`, {
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
