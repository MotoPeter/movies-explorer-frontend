import "./savedMovies.css";
import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SubmitSearch from "../SubmitSearch/SubmitSeadch";

const SavedMovies = ({ savedMovies, deleteMovie }) => {
	//положение чекбокса на странице сохраненных фильмов
	const [isCheckboxSavedMovies, setIsCheckboxSavedMovies] =
		React.useState(false);
	const [isCheckboxRezultSavedMovies, setIsCheckboxRezultSavedMovies] =
		React.useState(false);
	const [savedMoviesRezult, setSavedMoviesRezult] = React.useState([]);
	const [savedMoviesCheckboxRezult, setSavedMoviesCheckboxRezult] =
		React.useState([]);
    const[searchText, setSearchText] = React.useState('')

	React.useEffect(() => {
		setSavedMoviesRezult(savedMovies);
    searchSavedMovies(searchText);
	}, [savedMovies]);

	//кнопка чекбокса
	const handleCheckboxSavedMovies = () => {
		setIsCheckboxSavedMovies(!isCheckboxSavedMovies);
	};

	const searchSavedMovies = (search) => {
    setSearchText(search)
		let searchRezultSavedMovies = SubmitSearch(savedMovies, search);
		setSavedMoviesRezult(searchRezultSavedMovies);
	};

  //React.useEffect(() => {
  //  console.log(searchText);
  //  searchSavedMovies(searchText);
	//}, [savedMovies]);

	//проверка длинны массива при изменении кнопки чекбокса
	const checkSavedMoviesLength = (moviesSearch) => {
		moviesSearch.length === 0
			? setIsCheckboxRezultSavedMovies(true)
			: setIsCheckboxRezultSavedMovies(false);
		return isCheckboxRezultSavedMovies;
	};

	React.useEffect(() => {
		if (isCheckboxSavedMovies) {
			let savedMoviesCheckboxOn = savedMoviesRezult.filter(
				({ duration }) => duration <= 40
			);
			setSavedMoviesCheckboxRezult(savedMoviesCheckboxOn);
		} else {
			setSavedMoviesCheckboxRezult(savedMoviesRezult);
		}
	}, [isCheckboxSavedMovies, savedMoviesRezult, savedMovies]);

	React.useEffect(() => {
		checkSavedMoviesLength(savedMoviesCheckboxRezult);
	}, [savedMoviesCheckboxRezult]);

	return (
		<main className="saved-movies">
			<SearchForm
				onSubmit={searchSavedMovies}
				handleCheckbox={handleCheckboxSavedMovies}
			/>
			{isCheckboxRezultSavedMovies && (
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
