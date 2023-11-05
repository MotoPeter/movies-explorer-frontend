import Reference from "../Reference/Reference";
import "./navTab.css";

function NavTab() {
	return (
		<nav style={{ marginLeft: "auto" }}>
			<ul className="nav-tab">
				<li className="nav-tab__item">
					<Reference
						linkTo="/sign-up"
						classText="link__text link__text_type_signup"
						linkTitle="Регистрация"
					/>
				</li>
				<li className="nav-tab__item">
					<Reference
						linkTo="/sign-in"
						classText="link__text link__text_type_signin"
						linkTitle="Войти"
					/>
				</li>
			</ul>
		</nav>
	);
}

export default NavTab;
