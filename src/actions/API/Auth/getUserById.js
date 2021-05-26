import CONFIG from "../Config";

const URL = CONFIG.URL;

export default async function getUserById({ userID }) {
	return await fetch(URL + `auth/getUser/${userID}`, {
		method: "GET",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
		},
	})
		.then((res) => {
			if (res.status === 400) throw new Error("Server Error");
			if (res.status === 404) throw new Error("Not Found");
			return res.json();
		})
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return { code: 400, err };
		});
}
