import "./footer.css";

const Footer = () => {
	return (
		<footer className="footer">
			<h2 className="footer__title">
				Учебный проект Яндекс.Практикум х BeatFilm.
			</h2>
			<div className="footer__content">
				<p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
				<nav>
					<ul className="footer__link-list">
						<li>
							<a
								className="link footer__link"
								href="https://practicum.yandex.ru/"
								target="_blank"
								rel="noreferrer"
							>
								Яндекс.Практикум
							</a>
						</li>
						<li>
							<a
								className="link footer__link"
								href="https://github.com"
								target="_blank"
								rel="noreferrer"
							>
								Github
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</footer>
	);
};

export default Footer;
