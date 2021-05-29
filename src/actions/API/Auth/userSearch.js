import CONFIG from "../Config";

const URL = CONFIG.URL;

export default async function getUserById(query) {
	return await fetch(URL + `auth/userSearch?q=${query}`, {
		method: "GET",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
		},
	})
		.then((res) => {
			return res.json();
		})
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return { code: 400, err };
		});
}
