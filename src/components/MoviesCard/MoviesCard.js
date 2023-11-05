import { useState } from "react";
import "./moviesCard.css";

function MoviesCard({ movie }) {
	const [isCardLike, setIsCardLike] = useState(false);

	function handleLikeClick() {
		setIsCardLike(!isCardLike);
	}

	return (
		<article className="card">
			<a className="card__link link" href={movie.link}>
				<img
					className="card__image"
					src={movie.image}
					alt={`кадр из фильма ${movie.name}`}
				></img>
			</a>
			<div className="card__info">
				<a className="card__title link" href={movie.link}>
					<h2 className="card__title-text">{movie.name}</h2>
				</a>
				{window.location.pathname !== "/movies" ? (
					<button type="button" className="card__button-del link" />
				) : (
					<button
						type="button"
						className={
							isCardLike
								? `card__button-like card__button-like_true`
								: `card__button-like card__button-like_false link`
						}
						onClick={handleLikeClick}
					/>
				)}
			</div>
			<p className="card__duration">{movie.duration}</p>
		</article>
	);
}

export default MoviesCard;
