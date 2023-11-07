import { useEffect, useState } from "react";
import "./moviesCard.css";

function MoviesCard({ movie, newSavedMovies, deleteMovie, savedMovies, }) {
	//кнопка лайка
	const [isCardLike, setIsCardLike] = useState(false);

	//для страницы всех фильмов проверяем лайки
	useEffect(() => {
		if (window.location.pathname === "/movies") {
			setIsCardLike(savedMovies.some((elem) => elem.movieId === movie.movieId));
		}
	}, [movie, savedMovies]);

	//по нажатию лайка
	function handleLikeClick() {
		//setIsCardLike(!isCardLike);
		!isCardLike ? newSavedMovies(movie, setIsCardLike) : deleteMovie(movie, setIsCardLike);
	}

	//по нажатию удаления
	function handleDelClick() {
		deleteMovie(movie, setIsCardLike);
	}

	//функция пересчета времени
	function getMovieDuration(min) {
		return `${Math.floor(min / 60)}ч ${min % 60}м`;
	}

	return (
		<article className="card">
			<a
				className="card__link link"
				href={movie.trailerLink}
				target="_blank"
				rel="noreferrer"
			>
				<img
					className="card__image"
					src={movie.image}
					alt={`кадр из фильма ${movie.nameRU}`}
				></img>
			</a>
			<div className="card__info">
				<a
					className="card__title link"
					href={movie.trailerLink}
					target="_blank"
					rel="noreferrer"
				>
					<h2 className="card__title-text">{movie.nameRU}</h2>
				</a>
				{window.location.pathname !== "/movies" ? (
					<button
						type="button"
						className="card__button-del link"
						onClick={handleDelClick}
					/>
				) : (
					<button
						type="button"
						className={
							isCardLike
								? `card__button-like card__button-like_true link`
								: `card__button-like card__button-like_false link`
						}
						onClick={handleLikeClick}
					/>
				)}
			</div>
			<p className="card__duration">{getMovieDuration(movie.duration)}</p>
		</article>
	);
}

export default MoviesCard;
