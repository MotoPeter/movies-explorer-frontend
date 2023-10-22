import React from "react";
import "./aboutMe.css";
import myPhoto from "../../images/white-shark.jpg";

const AboutMe = () => {
	return (
		<section className="about-me">
			<h2 className="page__subtitle">Студент</h2>

			<div className="about-me__content">
				<div className="about-me__text">
					<h3 className="about-me__name">Петр</h3>
					<p className="about-me__occupation">Фронтенд-разработчик, 48 лет</p>
					<p className="about-me__biography">
						Я родился в г. Уфа, с 1999 года живу в Москве. Закончил УГАТУ по
						специальности &quot;инженер-экономист&quot;. У меня есть жена и
						дочь. Мое главное хобби - мотоциклы. Недавно начал кодить. С 2018
						года работаю руководителем отдела на оборонном заводе. После того,
						как закончу курс по веб-разработке, хочу стать фрилансером.
					</p>
					<a
						className="link about-me__link"
						href="https://github.com/MotoPeter"
						target="_blank"
						rel="noreferrer"
					>
						Github
					</a>
				</div>
				<img src={myPhoto} alt="about-me" className="about-me__image" />
			</div>
		</section>
	);
};

export default AboutMe;
