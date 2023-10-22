import React, { useState, useEffect } from "react";
import "./app.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { AppContext } from "../../contexts/AppContext";
import { api } from "../../utils/api";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import * as moviesAuth from "../../utils/moviesAuth";
import NavPopup from "../NavPopup/NavPopup";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Page404 from "../page404/Page404";

function App() {
	//данные пользователя
	const [currentUser, setCurrentUser] = useState({
		name: "Виталий",
		email: "pohcta@yandex.ru",
		_id: "123456789",
	});
	//переменная состояния попапа навигации
	const [isNavPopup, setisNavPopup] = useState(false);
	//переменная состояния авторизации
	const [isRegister, setIsRegister] = useState(false);
	//переменная состояния загрузки
	const [isLoading, setIsLoading] = useState(false);
	//массив фильмов
	const [movies, setMovies] = useState([]);
	// лайк карточки
	const [isLiked, setIsLiked] = useState(false);
	//массив сохраненных фильмов
	const [savedMovies, setSavedMovies] = useState([]);
	//состояние логирования
	const [isLoggedIn, setIsLoggedIn] = useState(true);

	const navigate = useNavigate();

	// функция, которая принимает функцию запроса
	function handleSubmit(request) {
		// запускает прелоадер
		setIsLoading(true);
		//запускает функцию запроса
		request()
			.then()
			// ловит ошибку
			.catch(console.error)
			// закрывает прелоадер
			.finally(() => setIsLoading(false));
	}

	//при загрузке страницы проверяем токен в локал
	useEffect(() => {
		tokenCheck();
	}, []);

	//проверяем токен в локале
	const tokenCheck = () => {
		//если в локал есть токен, извлекаем его
		if (localStorage.getItem("token")) {
			const token = localStorage
				.getItem("token")
				//запрашиваем api
				.then((res) => {
					if (res) {
						//если в ответе есть данные... и переадресовываем на главную страницу
						//меняем состояние
						setIsRegister(true);
						navigate("/", { replace: true });
					}
				})
				.catch(console.error);
		}
	};

	//функция лайка карточки
	function handleCardLike(card) {
		//переменная состояния для отображения лайка
		setIsLiked(true);
		api
			//запрос к апи на сохранение фильма
			.then((newMovies) => {
				//добавление фильма в массив сохраненных
			})
			.catch(console.error);
	}

	//удаление лайка
	function handleCardDel(card) {
		//переменная состояния для отображения лайка
		setIsLiked(false);
		api
			//запрос к апи на удаление
			.then((res) => {
				//удаление из массива сохраненых
			})
			.catch(console.error);
	}

	//получение сохраненных фильмов и данных пользователя
	//useEffect(() => {
	//	Promise.all()
	//		.then(([savedMovies, userInfo]) => {
	//			setSavedMovies(savedMovies);
	//			setCurrentUser(userInfo);
	//		})
	//		.catch(console.error);
	//}, []);

	//функция обновления данных аккаунта
	function handleUpdateUser({ name, email }) {
		//обращение к апи и запись результата в каррентюзер
		function makeRequest() {
			return api.editProfile({ name, email }).then(setCurrentUser);
		}
		//передаем функцию запроса
		handleSubmit(makeRequest);
	}

	//функция регистрации
	const handleRegistrSubmit = (formValue) => {
		const { password, email } = formValue
			//отправляем в апи данные
			.then((res) => {
				//функция переадресации
				inCaseRegister();
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {});
	};

	//функция авторизации
	const handleLoginSubmit = (formValue) => {
		const { password, email } = formValue
			//обращение к апи
			.then((data) => {
				//сохраняем токен в локал
				if (data.token) {
					localStorage.setItem("token", data.token);
					//проверяем токен
					tokenCheck();
				}
			})
			.catch(console.error);
	};

	//переадресовываем на страницу входа
	const inCaseRegister = () => {
		navigate("/sign-in", { replace: true });
		setIsRegister(true);
	};

	//выход из аккаунта
	const logOutProfile = () => {
		//удаляем токен
		localStorage.removeItem("token");
		setIsLoggedIn(false);
		setCurrentUser({
			id: "",
			email: "",
			name: "",
		});
		//переадресовываем на страницу входа
		navigate("/", { replace: true });
	};

	//открытие попапа с навигацией
	function handleNavPopup() {
		setisNavPopup(true);
	}

	//закрытие попапа с навигацией
	function closeNavPopup() {
		setisNavPopup(false);
	}

	return (
		<AppContext.Provider value={{ isLoading, closeNavPopup }}>
			<CurrentUserContext.Provider value={currentUser}>
				<div className="page">
					<Routes>
						<Route
							path="/sign-up"
							element={<Register handleSubmit={handleRegistrSubmit} />}
						/>
						<Route path="*" element={<Page404 />} />
						<Route
							path="/sign-in"
							element={<Login handleLoginSubmit={handleLoginSubmit} />}
						/>

						<Route
							path="/"
							element={
								<ProtectedRouteElement loggedIn={isLoggedIn}>
								<>
									<Header
										styleColor="#073042"
										isLoggedIn={isLoggedIn}
										onNavPopup={handleNavPopup}
									/>
									<Main />
									<Footer />
								</>
								</ProtectedRouteElement>
							}
						/>
						<Route
							path="/profile"
							element={
								<Profile
									handleNavPopup={handleNavPopup}
									logOutProfile={logOutProfile}
								/>
							}
						/>
						<Route
							path="/movies"
							element={
								<>
									<Header isLoggedIn={isLoggedIn} onNavPopup={handleNavPopup} />
									<Movies />
									<Footer />
								</>
							}
						/>
						<Route
							path="/saved-movies"
							element={
								<>
									<Header isLoggedIn={isLoggedIn} onNavPopup={handleNavPopup} />
									<SavedMovies />
									<Footer />
								</>
							}
						/>
						<Route
							path="/saved-movies"
							element={
								<Header isRegister={isRegister} onNavPopup={handleNavPopup} />
							}
						/>
					</Routes>
					<NavPopup
						//открытие попапа
						isOpen={isNavPopup && "popup_openend"}
						onClose={closeNavPopup}
					/>
				</div>
			</CurrentUserContext.Provider>
		</AppContext.Provider>
	);
}

export default App;
