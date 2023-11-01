import "./savedMovies.css";
import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies = ({savedMovies, deleteMovie}) => {

	return (
		<main className="saved-movies">
			<SearchForm />
			<MoviesCardList movies={savedMovies} deleteMovie={deleteMovie} />
		</main>
	);
};

export default SavedMovies;
