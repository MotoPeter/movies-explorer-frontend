import React, { useState, useEffect } from "react";
import "./app.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { AppContext } from "../../contexts/AppContext";
import { api } from "../../utils/mainApi";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import * as moviesAuth from "../../utils/moviesAuth";
import NavPopup from "../NavPopup/NavPopup";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Page404 from "../page404/Page404";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import imgOk from "../../images/img-ok.png";
import imgNone from "../../images/img-none.png";

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
	//const [movies, setMovies] = useState([]);
	// лайк карточки
	const [isLiked, setIsLiked] = useState(false);
	//массив сохраненных фильмов
	//const [savedMovies, setSavedMovies] = useState([]);
	//состояние логирования
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	//стейс открытия тултипа
	const [isInfoTooltipPopup, setIsInfoTooltipPopup] = useState(false);
	//стуйт ошибки
	const [error, setError] = useState();

	const navigate = useNavigate();

	//сбрасываем ошибку при переходе на другую страницу
	const { pathname } = useLocation();
	useEffect(() => {
		setError("");
	}, [pathname]);

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
	//useEffect(() => {
	//	tokenCheck();
	//}, []);

	//проверяем токен в локале
	const tokenCheck = () => {
		//если в локал есть токен, извлекаем его
		if (localStorage.getItem("token")) {
			const token = localStorage.getItem("token");
			//запрашиваем api
			moviesAuth
				.getContent(token)
				.then((res) => {
          console.log(res);
					if (res) {
						//если в ответе есть данные
						setCurrentUser(res);
						//меняем состояние
						setIsRegister(true);
            setIsLoggedIn(true);
						//переадресовываем на страницу с фильмами
						inCaseRegister();
					}
				})
				.catch(console.error);
		}
	};

	//функция лайка карточки
	function handleCardLike(card) {
		//переменная состояния для отображения лайка
		setIsLiked(true)
			//запрос к апи на сохранение фильма
			.then((newMovies) => {
				//добавление фильма в массив сохраненных
			})
			.catch(console.error);
	}

	//удаление лайка
	function handleCardDel(card) {
		//переменная состояния для отображения лайка
		setIsLiked(false)
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
		//получаем значения
		const { name, email, password } = formValue;
		//обращаемя к апи
		moviesAuth
			.register(name, email, password)
			.then((res) => {
				//стейт регистарции
				setIsRegister(true);
				//открываем тултип
				tooltipOpen();
				//запрашиваем токен
				handleLoginSubmit({password, email})
      })
			.catch((err) => {
				console.log(err);
				//стейт регистрации
				setIsRegister(false);
				//открываем тултип
				tooltipOpen();
				//записываем в стейт ошибку
				setError(err);
			})
			.finally(() => {
				tooltipOpen();
			});
	};

	//функция авторизации
	const handleLoginSubmit = (formValue) => {
		const { password, email } = formValue
			//обращение к апи
      moviesAuth
			.authorization(password, email)
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

	//переадресовываем на страницу фильмов
	const inCaseRegister = () => {
		navigate("/movies", { replace: true });
		setError("");
	};

	//выход из аккаунта
	const logOutProfile = () => {
		//удаляем токен
		//localStorage.removeItem("token");
		setIsLoggedIn(false);
		setCurrentUser({
			id: "",
			email: "",
			name: "",
		});
		//переадресовываем на страницу входа
		navigate("/", { replace: true });
	};

	const tooltipOpen = () => {
		setIsInfoTooltipPopup(true);
	};

	//открытие попапа с навигацией
	function handleNavPopup() {
		setisNavPopup(true);
	}

	//закрытие всех попапов
	function closeNavPopup() {
		setisNavPopup(false);
		setIsInfoTooltipPopup(false);
	}

	//закрытие тултипа
	useEffect(() => {
		if (isInfoTooltipPopup)
			setTimeout(() => {
				closeNavPopup();
			}, 2000);
	}, [isInfoTooltipPopup]);

	return (
		<AppContext.Provider value={{ isLoading, closeNavPopup }}>
			<CurrentUserContext.Provider value={currentUser}>
				<div className="app">
					<Routes>
						<Route
							path="/sign-up"
							element={
								<Register
									handleRegistrSubmit={handleRegistrSubmit}
									error={error}
								/>
							}
						/>
						<Route path="*" element={<Page404 />} />
						<Route
							path="/sign-in"
							element={<Login handleLoginSubmit={handleLoginSubmit} />}
						/>
						<Route
							path="/"
							element={
								<>
									<Header
										styleColor="#073042"
										isLoggedIn={isLoggedIn}
										onNavPopup={handleNavPopup}
									/>
									<Main />
									<Footer />
								</>
							}
						/>
						<Route
							path="/profile"
							element={
								<ProtectedRouteElement loggedIn={isLoggedIn}>
									<Profile
										handleNavPopup={handleNavPopup}
										logOutProfile={logOutProfile}
									/>
								</ProtectedRouteElement>
							}
						/>
						<Route
							path="/movies"
							element={
								<ProtectedRouteElement loggedIn={isLoggedIn}>
									<>
										<Header
											isLoggedIn={isLoggedIn}
											onNavPopup={handleNavPopup}
										/>
										<Movies />
										<Footer />
									</>
								</ProtectedRouteElement>
							}
						/>
						<Route
							path="/saved-movies"
							element={
								<ProtectedRouteElement loggedIn={isLoggedIn}>
									<>
										<Header
											isLoggedIn={isLoggedIn}
											onNavPopup={handleNavPopup}
										/>
										<SavedMovies />
										<Footer />
									</>
								</ProtectedRouteElement>
							}
						/>
					</Routes>
					<NavPopup
						//открытие попапа
						isOpen={isNavPopup ? "popup popup_openend" : "popup"}
						onClose={closeNavPopup}
					/>
					<InfoTooltip
						title={
							isRegister
								? "Вы успешно зарегистрировались!"
								: "Что то пошло не так! Попробуйте еще раз!"
						}
						imgAlt={isRegister ? "галочка" : "крестик"}
						imgSrc={isRegister ? imgOk : imgNone}
						onClose={closeNavPopup}
						isOpen={isInfoTooltipPopup ? "tooltip tooltip_openend" : "tooltip"}
						name={"infoTooltip"}
					/>
				</div>
			</CurrentUserContext.Provider>
		</AppContext.Provider>
	);
}

export default App;
