import Reference from "../Reference/Reference";
import "./navMovies.css";

function NavMovies() {
	return (
		<nav>
			<ul className="nav-movies">
				<li className="nav-movies__item">
					<Reference
						classText={
							window.location.pathname === "/movies"
								? "link__movies link__movies_active"
								: "link__movies"
						}
						linkTitle="Фильмы"
						linkTo="/movies"
					/>
				</li>
				<li className="nav-movies__item">
					<Reference
						classText={
							window.location.pathname === "/saved-movies"
								? "link__movies link__movies_active"
								: "link__movies"
						}
						linkTitle="Сохраненные фильмы"
						linkTo="/saved-movies"
					/>
				</li>
			</ul>
		</nav>
	);
}

export default NavMovies;
