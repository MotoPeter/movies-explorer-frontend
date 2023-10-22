import "./savedMovies.css";
import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { savedMovies } from "../../utils/constants";

const SavedMovies = () => {
	return (
		<section className="movies">
			<SearchForm />
			<MoviesCardList movies={savedMovies} />
		</section>
	);
};

export default SavedMovies;
