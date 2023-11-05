/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Reference from "../Reference/Reference";
import "./navPopup.css";
import { AppContext } from "../../contexts/AppContext";

function NavPopup({ isOpen }) {
	const value = React.useContext(AppContext);

	React.useEffect(() => {
		if (!isOpen) return;

		//закрытие по ESC
		function handleESC(e) {
			if (e.key === "Escape") {
				value.closeNavPopup();
			}
		}

		//слушатель клавиатуры
		document.addEventListener("keydown", handleESC);
		//отключаем слушатель
		return () => document.removeEventListener("keydown", handleESC);
		//зависимости открытие попапа и закрытие
	}, [isOpen, value.closeNavPopup]);

	//закрытие попапа по клику на область
	function clickClosePopap(e) {
		if (e.target.classList.contains("popup_openend")) {
			value.closeNavPopup();
		}
	}

	return (
		<section className={isOpen} onClick={clickClosePopap}>
			<nav className="popup__container">
				<button
					type="button"
					className="popup__close"
					onClick={value.closeNavPopup}
				/>
				<div className="popup__content">
					<Reference
						classType="popup-opening"
						classText={
							window.location.pathname === "/"
								? "popup-opening__text popup-opening__text_active"
								: "popup-opening__text"
						}
						linkTo="/"
						linkTitle="Главная"
					/>
					<Reference
						classType="popup-opening"
						classText={
							window.location.pathname === "/movies"
								? "popup-opening__text popup-opening__text_active"
								: "popup-opening__text"
						}
						linkTitle="Фильмы"
						linkTo={"movies"}
					/>
					<Reference
						classType="popup-opening"
						classText={
							window.location.pathname === "/saved-movies"
								? "popup-opening__text popup-opening__text_active"
								: "popup-opening__text"
						}
						linkTitle="Сохраненные фильмы"
						linkTo={"saved-movies"}
					/>
				</div>
				<Reference
					classType="popup-accaunt"
					classText="popup-accaunt-text"
					linkTitle="Аккаунт"
					linkTo={"profile"}
				/>
			</nav>
		</section>
	);
}

export default NavPopup;
