import React from "react";
import "./AboutProject.css";

const AboutProject = () => {
	return (
		<section className="about" id="aboutProject">
			<h2 className="page__subtitle">О проекте</h2>
			<div className="about__content">
				<div className="about__info">
					<div>
						<h3 className="about__info-title">
							Дипломный проект включал 5 этапов
						</h3>
						<p className="about__info-text">
							Составление плана, работу над бэкендом, вёрстку, добавление
							функциональности и финальные доработки.
						</p>
					</div>
					<div>
						<h3 className="about__info-title">
							На выполнение диплома ушло 5 недель
						</h3>
						<p className="about__info-text">
							У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
							соблюдать, чтобы успешно защититься.
						</p>
					</div>
				</div>
				<div className="about__graph">
					<div className="about__graph-line">
						<div className="about__graph-title">1 неделя</div>
						<p className="about__graph-subtitle">Back-end</p>
					</div>

					<div className="about__graph-line">
						<div
							className="about__graph-title"
							style={{ backgroundColor: "#303030", color: "white" }}
						>
							4 недели
						</div>
						<p className="about__graph-subtitle">Front-end</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutProject;
