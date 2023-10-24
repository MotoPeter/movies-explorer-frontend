import "./techs.css";

const Techs = () => {
	return (
		<section className="techs">
			<h2 className="page__subtitle">Технологии</h2>
			<div className="techs__content">
				<h3 className="techs__subtitle">7 технологий</h3>
				<p className="techs__text">
					На курсе веб-разработки мы освоили технологии, которые применили
					в&nbsp;дипломном проекте.
				</p>
				<ul className="techs__items">
					<li className="techs__item">HTML</li>
					<li className="techs__item">CSS</li>
					<li className="techs__item">JS</li>
					<li className="techs__item">React</li>
					<li className="techs__item">Git</li>
					<li className="techs__item">Express.js</li>
					<li className="techs__item">mongoDB</li>
				</ul>
			</div>
		</section>
	);
};

export default Techs;
