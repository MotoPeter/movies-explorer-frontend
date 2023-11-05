//функция проверки запроса
import { checkResponse } from "./checkResponse";
import { MAIN_API } from "./constants";

class Api {
	//в конструктор url и заголовок в виде массива - токен авторизации и тип данных
	constructor(url, headers, checkResponse) {
		this._url = url;
		this._headers = headers;
		this._checkResponse = checkResponse;
	}

  //универсальный метод проверки запроса
  _request(url, options) {
    return fetch(url, options)
  }

  //загрузка сохраненных фильмов с сервера
	getInitialSavedMovies(headers) {
		//запрос на сервер на получение сохраненных фильмов
		return this._request(`${this._url}/movies`, {
			headers: headers,
			//получив промис проверяем статус
		})
	}

	//получение данных пользователя с сервера
	getUserInfo() {
		return fetch(`${this._url}/users/me`, {
      credentials: 'include',
			headers: this._headers,
		}).then(this._checkResponse);
	}

	//редактирование профиля на вход массив с именем и профессией
	editProfile({ name, email }) {
		return fetch(`${this._url}/users/me`, {
      credentials: 'include',
			//метод для частичного обновления
			method: "PATCH",
			headers: this._headers,
			//преобразуем в строку
			body: JSON.stringify({
				name,
				email,
			}),
			//полученный промис отправляем на проверку статуса
		}).then(this._checkResponse);
	}

	//отправка на сервер новой карточки
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
		})
	}

	deleteSavedMovies(place, headers) {
		return fetch(`${this._url}/movies/${place._id}`, {
			//метод для отправки данных
			method: "DELETE",
      credentials: 'include',
			headers: headers,
		})
	}

}

//создаем элемент api
const mainApi = new Api(
	MAIN_API,
	{
    'Authorization': localStorage.getItem("token"),
    'Content-Type': 'application/json',
	},
  //функция проверки ответа от сервера
	checkResponse
);

export default mainApi;
