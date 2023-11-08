import "./moviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, newSavedMovies, deleteMovie, savedMovies, }) {
	return (
		<section className="grid-places">
			{movies.map((movie) => (
				<MoviesCard
					key={movie._id ? movie._id : movie.movieId}
					movie={movie}
					newSavedMovies={newSavedMovies}
					deleteMovie={deleteMovie}
					savedMovies={savedMovies}
				/>
			))}
		</section>
	);
}

export default MoviesCardList;
