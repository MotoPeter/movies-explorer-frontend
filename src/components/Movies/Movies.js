import "./movies.css";
import { React, useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useResize } from "../../hooks/useResize";

const Movies = ({
	moviesSearch,
	getMovies,
	isSearchRezult,
	newSavedMovies,
	deleteMovie,
	savedMovies,
  isMoviesApiError
}) => {
	//массив оставшихся карточек
	const [isRemaningMovies, setIsRemaningMovies] = useState(null);
	//состояние отображения кнопки еще
	const [isMoreButton, setIsMoreButton] = useState(true);
	//результат фильтрации по чекбоксу
	const [isCheckboxRezult, setIsCheckboxRezult] = useState(true);
	//кнопка чекбокса
	const [isCheckboxMovies, setIsCheckboxMovies] = useState(false);
	//переменная массива карточек для отрисовки
	const [movies, setMovies] = useState([]);

	//колличество карточек начальной загрузки и при нажатии еще
	const { splittingMovies } = useResize();

  //массив фильмов из локала
	const defaultIsMovies = JSON.parse(window.localStorage.getItem("movies"));

  //если в локале есть значение кнопки чекбокса, то значит он был включен
	useEffect(() => {
		if (localStorage.getItem("CheckboxMovies")) {
			const CheckboxOn = Boolean(localStorage.getItem("CheckboxMovies"));
			setIsCheckboxMovies(CheckboxOn);
		}
	}, []);

	//включение-выключение чекбокса
	function handleCheckbox() {
		setIsCheckboxMovies(!isCheckboxMovies);
	}

	//проверка длинны массива при изменении кнопки чекбокса
	const moviesSertchRezult = (moviesSearch) => {
		moviesSearch == 0 ? setIsCheckboxRezult(false) : setIsCheckboxRezult(true);
		return isCheckboxRezult;
	};

	//в зависимости от значения хука ширины экрана присваиваем значения переменным состояния
	useEffect(() => {
    //при включении кнопки сохраняем значение, при выключении удаляем
		isCheckboxMovies
			? localStorage.setItem("CheckboxMovies", isCheckboxMovies)
			: localStorage.removeItem("CheckboxMovies");
      //если в локале нет сохраненого массива
		if (!defaultIsMovies) {
      //получаем пустой массив
			splitArr(moviesSearch, splittingMovies);
		} else {
      //если есть его отправляем на разбивку
			splitArr(defaultIsMovies, splittingMovies);
		}
	}, [moviesSearch, splittingMovies, isCheckboxMovies, isCheckboxRezult]);

	//функция разбивки массива и отображения кнопки еще
	function splitArr(arr, splittingMovies) {
    //фильтруем по кнопке чекбокса
		isCheckboxMovies
			? (arr = arr.filter(({ duration }) => duration <= 40))
			: (arr = arr);
		//проверка массива по чекбоксу
		moviesSertchRezult(arr);
		//если чекбокс выключен отключаем ошибку поиска
		!isCheckboxMovies && setIsCheckboxRezult(true);
		//если длинна массива больше кол-ва отображаемых карточек
		if (arr.length > splittingMovies[0]) {
			//массив для отображения
			const loadingMovies = arr.slice(0, splittingMovies[0]);
			setMovies(loadingMovies);
			//массив оставшихся карточек
			const moreLoadingMovies = arr.slice(splittingMovies[0]);
			setIsRemaningMovies(moreLoadingMovies);
			//кнопка еще
			setIsMoreButton(true);
		} else {
			//иначе отображаем все карточки
			setMovies(arr);
			//скрываем кнопку еще
			setIsMoreButton(false);
		}
	}

	//функция кнопки еще
	function moreCards() {
		const RemaningMovies = isRemaningMovies;
		//новый массив для отрисовки- к старому добавляем элементы, удаленные из массива оставшихся в кол-ве согласно ширине экрана
		const newMovies = movies.concat(
			RemaningMovies.splice(0, splittingMovies[1])
		);
		//обновляем значения переменных состояния
		setMovies(newMovies);
		//если длинна оставшегося массива больше 0
		if (RemaningMovies.length > 0) {
			//записываем оставшийся массив и показываем кнопку
			setIsRemaningMovies(RemaningMovies);
			setIsMoreButton(true);
		} else {
			//иначе кнопку еще скрываем
			setIsMoreButton(false);
		}
	}

	return (
		<main className="movies">
			<SearchForm
				onSubmit={getMovies}
				handleCheckbox={handleCheckbox}
				cheked={isCheckboxMovies}
			/>
			{isMoviesApiError && (
				<span className="movies__text movies__text_type_error">
					Во время запроса произошла ошибка. Возможно, проблема с соединением
					или сервер недоступен. Подождите немного и попробуйте ещё раз
				</span>
			)}
			{(!isSearchRezult || !isCheckboxRezult) && (
				<span className="movies__text">Ни чего не найдено</span>
			)}
			<MoviesCardList
				movies={movies}
				newSavedMovies={newSavedMovies}
				deleteMovie={deleteMovie}
				savedMovies={savedMovies}
			/>
			{/*в зависимости от состояния скрываем или отображаем кнопку*/}
			{isMoreButton && (
				<div className="show-more">
					<button
						className="show-more__button link"
						type="button"
						name="show-more"
						onClick={moreCards}
					>
						Ещё
					</button>
				</div>
			)}
		</main>
	);
};

export default Movies;
