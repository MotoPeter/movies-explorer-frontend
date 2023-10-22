import React from "react";
import { useForm } from "../../hooks/useForm";
import "./authForm.css";

const AuthForm = ({ onSubmit, title, buttonSubmitText, ...props }) => {
	//данные из инпутов
	const { values, handleChange, setValues } = useForm({});

	//при сабмите
	const onSubmitAuthForm = (e) => {
		e.preventDefault();
		//onSubmit(values);
	};

	return (
		<form className="auth-form" name={"name"} onSubmit={onSubmitAuthForm}>
			<h2 className="auth-form__title">{title}</h2>
			{window.location.pathname === "/sign-up" && (
				<>
					<h3 className="auth-form__subtitle">Имя</h3>
					<input
						className="auth-form__input"
						name="name"
						id="name"
						type="name"
						value={values.name || ""}
						minLength="5"
						maxLength="50"
						required
						autoComplete="off"
						onChange={handleChange}
					/>
				</>
			)}
			<h3 className="auth-form__subtitle">E-mail</h3>
			<input
				className="auth-form__input"
				name="email"
				id="email"
				type="email"
				value={values.email || ""}
				minLength="5"
				maxLength="50"
				required
				autoComplete="off"
				onChange={handleChange}
			/>
			<h3 className="auth-form__subtitle">Пароль</h3>
			<input
				className={
					window.location.pathname === "/sign-up"
						? "auth-form__input-sign-up"
						: "auth-form__input"
				}
				styles={{ marginTop: 30 }}
				name="password"
				id="password"
				type="password"
				value={values.password || ""}
				minLength="4"
				maxLength="20"
				required
				autoComplete="off"
				onChange={handleChange}
			/>
			{window.location.pathname === "/sign-up" && (
				<span className="auth-form__span">Что то пошло не так</span>
			)}
			<button className="auth-form__button link" type="submit">
				{buttonSubmitText}
			</button>
			{props.children}
		</form>
	);
};

export default AuthForm;
