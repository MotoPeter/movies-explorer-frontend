import React from "react";
import Header from "../Header/Header";
import AuthForm from "../AuthForm/AuthForm";
import "./registr.css";
import Reference from "../Reference/Reference";

const Registr = ({ handleRegistrSubmit }) => {
	return (
		<section className="register">
			<Header />
			<AuthForm
				onSubmit={handleRegistrSubmit}
				title={"Добро пожаловать!"}
				buttonSubmitText={"Зарегистрироваться"}
			/>
			<div></div>
			<p className="register__text">
				Уже зарегистрированы?
				<Reference
					linkTo="/sign-in"
					classText="link-auth-text"
					linkTitle="Войти"
				/>
			</p>
		</section>
	);
};

export default Registr;
