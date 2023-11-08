//импорт функции проверки ответа от сервера
import { MAIN_API } from "./constants";

//передача на сервер данных регистрации - имя, емаил и пароль
export const register = (name, email, password) => {
	return fetch(`${MAIN_API}/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name: name, email: email, password: password }),
	});
};

//запрос на сервер при авторизации - пароль и емаил
export const authorization = (password, email) => {
	return fetch(`${MAIN_API}/signin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ password: password, email: email }),
	});
};

//запрос на сервер проверки токена
export const getContent = (token) => {
	return fetch(`${MAIN_API}/users/me`, {
		method: "GET",
		credentials: "include",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			authorization: token,
		},
	});
};

//редактирование профиля
export const editProfile = (name, email) => {
	return fetch(`${MAIN_API}/users/me`, {
		credentials: "include",
		//метод для частичного обновления
		method: "PATCH",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			authorization: localStorage.getItem("token"),
		},
		//преобразуем в строку
		body: JSON.stringify({
			name,
			email,
		}),
	});
};
