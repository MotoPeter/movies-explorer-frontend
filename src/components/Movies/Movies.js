import "./movies.css";
import { React, useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useResize } from "../../hooks/useResize";
import Preloader from "../Preloader/Preloader";

const Movies = ({
	moviesSearch,
	isPreloader,
	getMovies,
	setIsSearchRezult,
	isSearchRezult,
	handleCheckbox,
	isCheckboxMovies,
	moviesApiError,
  newSavedMovies,
  deleteMovie,
  savedMovies
}) => {
	//переменная массива карточек для отрисовки
	const [isMovies, setIsMovies] = useState([]);
	//массив оставшихся карточек
	const [isRemaningMovies, setIsRemaningMovies] = useState(null);
	//состояние отображения кнопки еще
	const [isMoreButton, setIsMoreButton] = useState(true);
	//результат фильтрации по чекбоксу
	const [isCheckboxRezult, setIsCheckboxRezult] = useState(true);

	//колличество карточек начальной загрузки и при нажатии еще
	const { splittingMovies } = useResize();

	//проверка длинны массива при изменении кнопки чекбокса
	const moviesSertchRezult = (moviesSearch) => {
		moviesSearch == 0 ? setIsCheckboxRezult(false) : setIsCheckboxRezult(true);
		return isCheckboxRezult;
	};

	//в зависимости от значения хука ширины экрана присваиваем значения переменным состояния
	useEffect(() => {
		isCheckboxMovies
			? (moviesSearch = moviesSearch.filter(({ duration }) => duration <= 40))
			: (moviesSearch = moviesSearch);
		//проверка массива по чекбоксу
		moviesSertchRezult(moviesSearch);
		//если чекбокс выключен отключаем ошибку поиска
		!isCheckboxMovies && setIsCheckboxRezult(true);
		//если длинна массива больше кол-ва отображаемых карточек
		if (moviesSearch.length > splittingMovies[0]) {
			//массив для отображения
			const loadingMovies = moviesSearch.slice(0, splittingMovies[0]);
			setIsMovies(loadingMovies);
			//массив оставшихся карточек
			const moreLoadingMovies = moviesSearch.slice(splittingMovies[0]);
			setIsRemaningMovies(moreLoadingMovies);
			//кнопка еще
			setIsMoreButton(true);
		} else {
			//иначе отображаем все карточки
			setIsMovies(moviesSearch);
			//скрываем кнопку еще
			setIsMoreButton(false);
		}
	}, [moviesSearch, splittingMovies, isCheckboxMovies, isCheckboxRezult]);

	//функция кнопки еще
	function moreCards() {
		const RemaningMovies = isRemaningMovies;
		//новый массив для отрисовки- к старому добавляем элементы, удаленные из массива оставшихся в кол-ве согласно ширине экрана
		const newMovies = isMovies.concat(
			RemaningMovies.splice(0, splittingMovies[1])
		);
		//обновляем значения переменных состояния
		setIsMovies(newMovies);
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
			<SearchForm onSubmit={getMovies} handleCheckbox={handleCheckbox} />
			{moviesApiError && (
				<span className="movies__text movies__text_type_error">
					Во время запроса произошла ошибка. Возможно, проблема с соединением
					или сервер недоступен. Подождите немного и попробуйте ещё раз»
				</span>
			)}
			{(!isSearchRezult || !isCheckboxRezult) && (
				<span className="movies__text">Ни чего не найдено</span>
			)}
			<MoviesCardList movies={isMovies} newSavedMovies={newSavedMovies} deleteMovie={deleteMovie} savedMovies={savedMovies} />
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
			{isPreloader && <Preloader />}
		</main>
	);
};

export default Movies;
