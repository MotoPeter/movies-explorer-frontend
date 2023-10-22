import "./moviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies }) {
	return (
		<section className="grid-places">
			{movies.map((movie, index) => (
				<MoviesCard key={movie._id} movie={movie} />
			))}
		</section>
	);
}

export default MoviesCardList;
