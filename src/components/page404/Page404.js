import Reference from "../Reference/Reference";
import "./page404.css";

const Page404 = () => {
	return (
		<div className="page-404">
			<h1 className="page-404__title">404</h1>
			<p className="page-404__text">Страница не найдена</p>
			<Reference linkTo="/" classType="link-page-404" linkTitle="Назад" />
		</div>
	);
};

export default Page404;
