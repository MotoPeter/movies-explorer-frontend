import React from "react";
import Header from "../Header/Header";
import AuthForm from "../AuthForm/AuthForm";
import "./registr.css";
import Reference from "../Reference/Reference";

const Registr = ({ handleRegistrSubmit, error }) => {
	return (
		<section className="register">
			<article className="register__content">
				<Header />
				<main>
					<AuthForm
						onSubmit={handleRegistrSubmit}
						title={"Добро пожаловать!"}
						buttonSubmitText={"Зарегистрироваться"}
            error={error}
					/>
					<div className="register__footer">
						<p className="register__text">Уже зарегистрированы?</p>
						<Reference
							linkTo="/sign-in"
							classText="link-auth-text"
							linkTitle="Войти"
						/>
					</div>
				</main>
			</article>
		</section>
	);
};

export default Registr;
