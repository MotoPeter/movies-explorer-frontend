import React from "react";
import "./promo.css";
import logo from "../../images/landing-logo.png";

const Promo = () => {
	return (
		<section className="promo">
			<div className="promo__content">
				<div className="promo__info">
					<h1 className="promo__title">
						Учебный&nbsp;проект студента факультета Веб&#8209;разработки.
					</h1>
					<p className="promo__text">
						Листайте ниже, чтобы узнать больше про этот проект и его создателя.
					</p>
					<a href="#aboutProject" className="link promo__link">
						Узнать больше
					</a>
				</div>
				<img src={logo} className="promo__logo" alt="планета" />
			</div>
		</section>
	);
};

export default Promo;
