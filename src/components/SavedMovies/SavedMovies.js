import "./savedMovies.css";
import { React, useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useResize } from "../../hooks/useResize";
import movies from "../../utils/constants";

const SavedMovies = () => {
	//переменная массива карточек для отрисовки
	const [isMovies, setIsMovies] = useState([]);
	//массив оставшихся карточек
	const [isRemaningMovies, setIsRemaningMovies] = useState(null);
	//состояние отображения кнопки еще
	const [isMoreButton, setIsMoreButton] = useState(true);

	//колличество карточек начальной загрузки и при нажатии еще
	const { splittingMovies } = useResize();

	//в зависимости от значения хука ширины экрана присваиваем значения переменным состояния
	useEffect(() => {
		//если длинна массива больше кол-ва отображаемых карточек
		if (movies.length > splittingMovies[0]) {
			//массив для отображения
			const loadingMovies = movies.slice(0, splittingMovies[0]);
			setIsMovies(loadingMovies);
			//массив оставшихся карточек
			const moreLoadingMovies = movies.slice(splittingMovies[0]);
			setIsRemaningMovies(moreLoadingMovies);
			//кнопка еще
			setIsMoreButton(true);
		} else {
			//иначе отображаем все карточки
			setIsMovies(movies);
			//скрываем кнопку еще
			setIsMoreButton(false);
		}
	}, [splittingMovies]);

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
		<section className="movies">
			<SearchForm />
			<MoviesCardList movies={isMovies} />
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
		</section>
	);
};

export default SavedMovies;