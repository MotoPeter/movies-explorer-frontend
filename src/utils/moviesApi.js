import { MOVIES_URL } from "./constants";

class MoviesApi {
	constructor(config) {
		this._address = config.address;
		this._headers = config.headers;
	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}

		return Promise.reject(`Ошибка: ${res.status}`);
	}

	getMovies() {
		return fetch(`${this._address}/beatfilm-movies`, {
			method: "GET",
			headers: this._headers,
		});
	}
}

const moviesApi = new MoviesApi({
	address: MOVIES_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export default moviesApi;
