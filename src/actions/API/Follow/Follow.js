import CONFIG from "../Config";

const URL = CONFIG.URL;

export default function Follow(userID, followedID, token) {
	return (async function () {
		return await fetch(`${URL}follow/${userID}/${followedID}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((res) => res);
	})();
}
