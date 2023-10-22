import React from "react";
import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import Portfolio from "../Portfolio/Portfolio";

function Main() {
	return (
		<main className="content">
			<Promo />
			<AboutProject />
			<Techs />
			<AboutMe />
			<Portfolio />
		</main>
	);
}

export default Main;
