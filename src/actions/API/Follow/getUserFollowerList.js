import CONFIG from "../Config";

const URL = CONFIG.URL;

export default function getUserFollowingList(userID) {
	return (async function () {
		return await fetch(`${URL}follow/followers/${userID}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((res) => res);
	})();
}
