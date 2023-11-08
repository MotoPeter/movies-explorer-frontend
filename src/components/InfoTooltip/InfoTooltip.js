import React from "react";
import { AppContext } from "../../contexts/AppContext";
import "./infoTooltip.css";

const InfoTooltip = ({ title, onClose, isOpen, imgSrc, imgAlt }) => {
	//функция закрытия попапа из контекста
	const value = React.useContext(AppContext);

	function clickClosePopap(e) {
		//  //если область клика содержит дочерний элемент - открытый попап
		if (e.target.classList.contains("tooltip_openend")) {
			onClose();
		}
	}

	React.useEffect(() => {
		if (!isOpen) return;

		function handleESC(e) {
			if (e.key === "Escape") {
				onClose();
			}
		}

		document.addEventListener("keydown", handleESC);

		return () => document.removeEventListener("keydown", handleESC);
	}, [isOpen]);

	return (
		<section className={isOpen} onClick={clickClosePopap}>
			<div className="tooltip__content">
				<button
					type="button"
					className="tooltip__close"
					onClick={value.closeNavPopup}
				>
					X
				</button>
				<img className="tooltip__img" src={imgSrc} alt={imgAlt}></img>
				<h3 className="tooltip__title">{title}</h3>
			</div>
		</section>
	);
};

export default InfoTooltip;
