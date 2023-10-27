import { checkResponse } from "./checkResponse";
import { MOVIES_URL } from "./constants";

class MoviesApi {
  constructor(url, headers, checkResponse) {
    this._url = url;
    this._headers = headers;
		this._checkResponse = checkResponse;
  }

  //универсальный метод проверки запроса
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }


  //загрузка карточек с сервера
	getInitialMovies() {
		//запрос на сервер на получение карточек
		return this._request(`${this._url}/beatfilm-movies`, {
			headers: this._headers,
			//получив промис проверяем статус
		})
	}
}


const moviesApi = new MoviesApi({
  url: MOVIES_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;