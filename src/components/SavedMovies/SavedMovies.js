import "./savedMovies.css";
import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SubmitSearch from "../SubmitSearch/SubmitSeadch";

const SavedMovies = ({ savedMovies, deleteMovie }) => {
	//положение чекбокса на странице сохраненных фильмов
	const [isCheckboxSavedMovies, setIsCheckboxSavedMovies] =
		React.useState(false);
	const [isSearchRezultSavedMovies, setIsSearchRezultSavedMovies] =
		React.useState(true);
	const [isCheckboxRezultSavedMovies, setIsCheckboxRezultSavedMovies] =
		React.useState(true);
	const [savedMoviesRezult, setSavedMoviesRezult] = React.useState(savedMovies);
	const [savedMoviesCheckboxRezult, setSavedMoviesCheckboxRezult] =
		React.useState([savedMovies]);

	const handleCheckboxSavedMovies = () => {
		setIsCheckboxSavedMovies(!isCheckboxSavedMovies);
	};

	const searchSavedMovies = (search) => {
		setSavedMoviesRezult(SubmitSearch(savedMovies, search));
		!savedMoviesRezult.length && setIsSearchRezultSavedMovies(false);
	};

	//проверка длинны массива при изменении кнопки чекбокса
	const savedMoviesSertchRezult = (moviesSearch) => {
		(moviesSearch.length == 0)
			? setIsCheckboxRezultSavedMovies(false)
			: setIsCheckboxRezultSavedMovies(true);
		return isCheckboxRezultSavedMovies;
	};

	React.useEffect(() => {
		!savedMoviesRezult.length
			? setIsSearchRezultSavedMovies(false)
			: setIsSearchRezultSavedMovies(true);
		if (isCheckboxSavedMovies) {
			let savedMoviesCheckboxOn=
				savedMoviesRezult.filter(({ duration }) => duration <= 40)
			setSavedMoviesCheckboxRezult(savedMoviesCheckboxOn)
			savedMoviesSertchRezult(savedMoviesCheckboxOn);
		} else {
			setIsCheckboxRezultSavedMovies(true);
			setSavedMoviesCheckboxRezult(savedMoviesRezult);
		}
	}, [isCheckboxSavedMovies, savedMovies, savedMoviesRezult]);

	return (
		<main className="saved-movies">
			<SearchForm
				onSubmit={searchSavedMovies}
				handleCheckbox={handleCheckboxSavedMovies}
			/>
			{(!isSearchRezultSavedMovies || !isCheckboxRezultSavedMovies) && (
				<span className="movies__text">Ни чего не найдено</span>
			)}
			<MoviesCardList
				movies={savedMoviesCheckboxRezult}
				deleteMovie={deleteMovie}
			/>
		</main>
	);
};

export default SavedMovies;
