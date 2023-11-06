//функция проверки запроса
import { MAIN_API } from "./constants";

class Api {
	//в конструктор url и заголовок в виде массива - токен авторизации и тип данных
	constructor(url, headers) {
		this._url = url;
		this._headers = headers;
	}

	//универсальный метод проверки запроса
	_request(url, options) {
		return fetch(url, options);
	}

	//загрузка сохраненных фильмов с сервера!!!
	getInitialSavedMovies(headers) {
		//запрос на сервер на получение сохраненных фильмов
		return this._request(`${this._url}/movies`, {
			headers: headers,
			//получив промис проверяем статус
		});
	}

	//отправка на сервер новой карточки !!!
	addNewSavedMovies(formValues, headers) {
		return fetch(`${this._url}/movies`, {
			//метод для отправки данных
			method: "POST",
			headers: headers,
			body: JSON.stringify({
				country: formValues["country"],
				director: formValues["director"],
				duration: formValues["duration"],
				year: formValues["year"],
				description: formValues["description"],
				image: formValues["image"],
				trailerLink: formValues["trailerLink"],
				thumbnail: formValues["thumbnail"],
				movieId: formValues["movieId"],
				nameRU: formValues["nameRU"],
				nameEN: formValues["nameEN"],
			}),
		});
	}

	//удаление !!!
	deleteSavedMovies(place, headers) {
		return fetch(`${this._url}/movies/${place._id}`, {
			//метод для отправки данных
			method: "DELETE",
			credentials: "include",
			headers: headers,
		});
	}
}

//создаем элемент api
const mainApi = new Api(MAIN_API, {
	Authorization: localStorage.getItem("token"),
	"Content-Type": "application/json",
});

export default mainApi;
