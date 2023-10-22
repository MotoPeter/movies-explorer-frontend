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
		<div className={`popup ${isOpen}`} onClick={clickClosePopap}>
			<div className="popup__container">
				<button
					type="button"
					className="popup__close"
					onClick={value.closeNavPopup}
				/>
				<Reference
					classType="popup-opening"
					classText="popup-text"
					linkTo="/"
					linkTitle="Главная"
				/>
				<Reference
					classType="popup-opening"
					classText="popup-text"
					linkTitle="Фильмы"
					linkTo={"movies"}
				/>
				<Reference
					classType="popup-opening"
					classText="popup-text"
					linkTitle="Сохраненные фильмы"
					linkTo={"saved-movies"}
				/>
				<Reference
					classType="popup-accaunt"
					classText="popup-accaunt-text"
					linkTitle="Аккаунт"
					linkTo={"profile"}
				/>
			</div>
		</div>
	);
}

export default NavPopup;
