import React, { useState, useEffect } from "react";
import "./app.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { AppContext } from "../../contexts/AppContext";
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
import { errorName } from "../../utils/checkResponse";
import moviesApi from "../../utils/moviesApi";
import mainApi from "../../utils/mainApi";
import Preloader from "../Preloader/Preloader";
import SubmitSearch from "../SubmitSearch/SubmitSeadch";

function App() {
	//данные пользователя
	const [currentUser, setCurrentUser] = useState({
		name: "",
		email: "",
		_id: "",
	});
	//переменная состояния попапа навигации
	const [isNavPopup, setisNavPopup] = useState(false);
	//переменная состояния авторизации
	const [isRegister, setIsRegister] = useState(false);
	//переменная состояния загрузки
	const [isLoading, setIsLoading] = useState(false);
	//массив сохраненных фильмов
	//const [savedMovies, setSavedMovies] = useState([]);
	//состояние логирования
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	//стейс открытия тултипа
	const [isInfoTooltipPopup, setIsInfoTooltipPopup] = useState(false);
	//стуйт ошибки
	const [error, setError] = useState();
	//стейт карточек с сервера всех
	const [movies, setMovies] = useState([]);
	//состояние результата поиска
	const [isSearchRezult, setIsSearchRezult] = useState(true);
	//текст тултипа
	const [textTooltip, setTextTooltip] = useState('');
	//состояние ошибки при подключении к серверу с фильмами
	const [isMoviesApiError, setIsMoviesApiError] = useState(false);
	//массив сохраненых карточек
	const [savedMovies, setSavedMovies] = useState([]);

	const navigate = useNavigate();

	//сбрасываем ошибку при переходе на другую страницу
	const { pathname } = useLocation();

	useEffect(() => {
		setError("");
	}, [pathname]);

	//загрузка сохраненных карточек
	function getSavedMovies() {
		mainApi
			.getInitialSavedMovies({
				Authorization: localStorage.getItem("token"),
				"Content-Type": "application/json",
			})
			.then(checkResponse)
			.then((res) => {
				setSavedMovies(res.reverse());
			})
			.catch(console.error);
	}

	//поис среди сохраненных карточек
	function searchSavedMovies(search) {
		//фильтруем по поиску
		let filterSavedMovies = SubmitSearch(savedMovies, search);
		setSavedMovies(filterSavedMovies.reverse());
	}
	// функция, которая принимает функцию запроса
	function handleSubmit(request) {
		//запускает функцию запроса
		request()
			.then((res) => {
				setIsLoading(false);
				setIsRegister(true);
        setTextTooltip('Данные успешно обновлены!')
				tooltipOpen();
				inCaseRegister();
			})
			// ловит ошибку
			.catch((err) => {
				console.log(err);
				tooltipOpen();
				setIsRegister(false);
			})
			// закрывает прелоадер
			.finally(() => {
				setIsLoading(false);
			});
	}

	//при загрузке страницы проверяем токен в локал
	useEffect(() => {
		tokenCheck();
	}, []);

	//проверяем токен в локале
	const tokenCheck = () => {
		//если в локал есть токен, извлекаем его
		if (localStorage.getItem("token")) {
			const token = localStorage.getItem("token");
			//запрашиваем api
			moviesAuth
				.getContent(token)
				.then(checkResponse)
				.then((res) => {
					if (res) {
						//если в ответе есть данные
						setCurrentUser(res);
						//меняем состояние
						setIsLoggedIn(true);
						getSavedMovies();
						//переадресовываем на страницу с фильмами
						inCaseRegister();
					}
				})
				.catch(console.error);
		}
	};

	//function handleCheckbox() {
	//	setIsCheckboxMovies(!isCheckboxMovies);
	//}

	//получение общего массива фильмов
	function getMovies(search) {
		//записываем в локал поисковый запрос
		localStorage.setItem("localSearch", search);
		// запускает прелоадер
		setIsLoading(true);
		moviesApi
			.getMovies()
			.then(checkResponse)
			.then((res) => {
				//фильтруем по поиску
				let filterMovies = SubmitSearch(res, search);
				//res.filter((item) => {
				//	if (item.nameRU.toLowerCase().includes(search.toLowerCase())) {
				//		return true;
				//	}
				//	if (item.nameEN.toLowerCase().includes(search.toLowerCase())) {
				//		return true;
				//	}
				//});
				let formatMovies = [];
				//приводим массив в соответствие с моделью сервера
				filterMovies.map((filterMovie) => {
					let formatMovie = {
						image: "https://api.nomoreparties.co" + filterMovie.image.url,
						trailerLink: filterMovie.trailerLink,
						thumbnail: "https://api.nomoreparties.co" + filterMovie.image.url,
						movieId: filterMovie.id,
						country: filterMovie.country || "Неизвестно",
						director: filterMovie.director,
						duration: filterMovie.duration,
						year: filterMovie.year,
						description: filterMovie.description,
						nameRU: filterMovie.nameRU,
						nameEN: filterMovie.nameEN,
					};
					formatMovies.push(formatMovie);
				});
				//сохраняем в стейт полученный массив
				setMovies(formatMovies);
        localStorage.setItem('movies', JSON.stringify(formatMovies));
				//если массив пустой, для отображения надписи
				filterMovies.length == 0
					? setIsSearchRezult(false)
					: setIsSearchRezult(true);
          //сбрасываем состояние ошибки
          //setIsMoviesApiError(false)
			})
			.catch((err) => {
				//состояние ошибки
				setIsMoviesApiError(true)
				//записываем в стейт ошибку
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	//сщхранение карточки при лайке
	function newSavedMovies(movie) {
		mainApi
			.addNewSavedMovies(movie, {
				Authorization: localStorage.getItem("token"),
				"Content-Type": "application/json",
			})
			.then(checkResponse)
			.then((res) => {
				setSavedMovies([res, ...savedMovies]);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	//удаление карточки из сохраненных
	function deleteMovie(movie) {
		mainApi
			.deleteSavedMovies(movie, {
				Authorization: localStorage.getItem("token"),
				"Content-Type": "application/json",
			})
			.then(checkResponse)
			.then((res) => {
				//удаляем из массива для отображения
        setSavedMovies((state) => state.filter((c) => c._id !== movie._id))
			})
			.catch((err) => {
				console.log(err);
			});
	}

	//удаление карточки через дизлайк на странице фильмов
	function deleteMovieFromMovies(movie) {
		//по id находим карточку в массиве сохраненных и передаем функции удаления
		const item = savedMovies.find((item) => item.movieId === movie.movieId);
		deleteMovie(item);
	}

	//функция обновления данных аккаунта
	function handleUpdateUser(name, email) {
		//обращение к апи и запись результата в каррентюзер
		function makeRequest() {
			return moviesAuth
				.editProfile(name, email)
				.then(checkResponse)
				.then(setCurrentUser);
		}
		//передаем функцию запроса
		handleSubmit(makeRequest);
	}

	//функция проверки ответа от сервера и записи текста ошибки
	function checkResponse(res) {
		if (res.ok) {
			return res.json();
		}
		res.json().then((e) => {
			setError(Object.values(e).toString());
		});
		return Promise.reject(`Ошибка: ${res.status}`);
	}

	//функция регистрации
	const handleRegistrSubmit = (name, email, password) => {
		//обращаемя к апи
		moviesAuth
			.register(name, email, password)
			.then(checkResponse)
			.then((res) => {
				//стейт регистарции
				setIsRegister(true);
        setTextTooltip('Вы успешно зарегистрировались!')
				//открываем тултип
				tooltipOpen();
				//запрашиваем токен
				handleLoginSubmit(name, email, password);
			})
			.catch((err) => {
				console.log(errorName);
				//стейт регистрации
				setIsRegister(false);
				//открываем тултип
				tooltipOpen();
				//записываем в стейт ошибку
				//setError(errorName);
			})
			.finally(() => {});
	};

	//функция авторизации
	const handleLoginSubmit = (name, email, password) => {
		//const { password, email } = formValue
		//	//обращение к апи
		moviesAuth
			.authorization(password, email)
			.then(checkResponse)
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
		localStorage.removeItem("token");
		localStorage.removeItem("localSearch");
    localStorage.removeItem('CheckboxMovies')
    localStorage.removeItem('movies')
    localStorage.removeItem("location");
		setIsLoggedIn(false);
		setMovies([]);
		setCurrentUser({});
		//переадресовываем на главную страницу
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
							element={
								<Login handleLoginSubmit={handleLoginSubmit} error={error} />
							}
						/>
						<Route
							path="/profile"
							element={
								<ProtectedRouteElement loggedIn={isLoggedIn}>
									<Profile
										handleNavPopup={handleNavPopup}
										logOutProfile={logOutProfile}
										onSubmit={handleUpdateUser}
										error={error}
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
										<Movies
											moviesSearch={movies}
											getMovies={getMovies}
											isSearchRezult={isSearchRezult}
											newSavedMovies={newSavedMovies}
											deleteMovie={deleteMovieFromMovies}
											savedMovies={savedMovies}
                      isMoviesApiError={isMoviesApiError}
										/>
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
										<SavedMovies
											savedMovies={savedMovies}
											deleteMovie={deleteMovie}
											searchSavedMovies={searchSavedMovies}
										/>
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
								? textTooltip
								: "Что то пошло не так! Попробуйте еще раз!"
						}
						imgAlt={isRegister ? "галочка" : "крестик"}
						imgSrc={isRegister ? imgOk : imgNone}
						onClose={closeNavPopup}
						isOpen={isInfoTooltipPopup ? "tooltip tooltip_openend" : "tooltip"}
						name={"infoTooltip"}
					/>
					{isLoading && <Preloader />}
				</div>
			</CurrentUserContext.Provider>
		</AppContext.Provider>
	);
}

export default App;
