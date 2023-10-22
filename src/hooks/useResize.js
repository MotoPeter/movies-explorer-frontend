//хук получения значения ширины окна
import { useState, useEffect } from "react";

export const useResize = () => {
	const [width, setWidth] = useState(window.innerWidth);
	const [splittingMovies, setSplittingMovies] = useState([]);

	//считаем количество карточек начальной загрузки и добавления кнопкой еще
	const countCardRow = (width) => {
		if (width >= 1280) {
			setSplittingMovies([16, 4]);
		} else if (width >= 990) {
			setSplittingMovies([12, 3]);
		} else if (width >= 768) {
			setSplittingMovies([8, 2]);
		} else {
			setSplittingMovies([5, 2]);
		}
	};
	useEffect(() => {
		const handleResize = (event) => {
			setWidth(event.target.innerWidth);
		};
		countCardRow(width);
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [width]);

	return {
		splittingMovies,
	};
};
