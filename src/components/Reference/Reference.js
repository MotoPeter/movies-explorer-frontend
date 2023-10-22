//компонент заголовка

import React from "react";
import "./reference.css";
import { Link } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";

//принимает пропсы заголовок ссылки, ссылка
function Reference({ linkTo, classType, classText, linkTitle }) {
	const value = React.useContext(AppContext);
	return (
		<Link
			to={`${linkTo}`}
			className={`link ${classType} `}
			onClick={value.closeNavPopup}
		>
			<p className={`${classText}`}>{linkTitle}</p>
		</Link>
	);
}

export default Reference;
