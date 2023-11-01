import React from "react";
import Header from "../Header/Header";
import AuthForm from "../AuthForm/AuthForm";
import "./login.css";
import Reference from "../Reference/Reference";

const Login = ({ handleLoginSubmit, error}) => {
	return (
		<section className="login">
			<article className="login__content">
				<Header />
				<main>
					<AuthForm
						onSubmit={handleLoginSubmit}
						title={"Рады видеть!"}
						buttonSubmitText={"Войти"}
            error={error}
					/>
					<div className="login__footer">
						<p className="login__text">Ещё не зарегистрированы?</p>
						<Reference
							linkTo="/sign-up"
							classText="link-auth-text"
							linkTitle="Регистрация"
						/>
					</div>
				</main>
			</article>
		</section>
	);
};

export default Login;
