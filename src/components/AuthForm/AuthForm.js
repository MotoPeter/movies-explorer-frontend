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
			<h1 className="auth-form__title">{title}</h1>
			{window.location.pathname === "/sign-up" && (
				<>
					<label htmlFor="name" className="auth-form__subtitle">
						Имя
					</label>
					<input
						className="auth-form__input"
						name="name"
						id="name"
						type="name"
						value={values.name || ""}
						placeholder="Ваше имя"
						minLength="5"
						maxLength="50"
						required
						autoComplete="off"
						onChange={handleChange}
					/>
				</>
			)}
			<label htmlFor="email" className="auth-form__subtitle">
				E-mail
			</label>
			<input
				className="auth-form__input"
				name="email"
				id="email"
				type="email"
				value={values.email || ""}
				placeholder="Ваша почта"
				minLength="5"
				maxLength="50"
				required
				autoComplete="off"
				onChange={handleChange}
			/>
			<label htmlFor="password" className="auth-form__subtitle">
				Пароль
			</label>
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
				placeholder="пароль"
				minLength="4"
				maxLength="20"
				required
				autoComplete="off"
				onChange={handleChange}
			/>
			{window.location.pathname === "/sign-up" && (
				<span className="auth-form__span">Что то пошло не так</span>
			)}
			<button
				className={
					window.location.pathname === "/sign-up"
						? "auth-form__button link"
						: "auth-form__button link auth-form__button_type_sign-in"
				}
				type="submit"
			>
				{buttonSubmitText}
			</button>
			{props.children}
		</form>
	);
};

export default AuthForm;
