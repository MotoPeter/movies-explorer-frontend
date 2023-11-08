import React from "react";
import "./authForm.css";
import { useInput } from "../../hooks/useInput";

const AuthForm = ({ onSubmit, title, buttonSubmitText, error, ...props }) => {
	//ввод имя
	const name = useInput("", {
		isEmpty: true,
		minLengthError: 2,
		maxLengthError: 30,
		isNameError: true,
	});

	//ввод почта
	const email = useInput("", {
		isEmpty: true,
		isEmailError: true,
	});

	//ввод пароль
	const password = useInput("", {
		isEmpty: true,
		minLengthError: 4,
		maxLengthError: 20,
	});

	//при сабмите
	const onSubmitAuthForm = (e) => {
		e.preventDefault();
		onSubmit(name.value, email.value, password.value);
	};

	return (
		<form className="auth-form" name={"name"} onSubmit={onSubmitAuthForm}>
			<h1 className="auth-form__title">{title}</h1>
			{window.location.pathname === "/sign-up" && (
				<>
					<label htmlFor="name" className="auth-form__subtitle">
						Имя
					</label>
					{name.isDirty && name.isEmpty && (
						<span className="auth-form__text">Поле не может быть пустым</span>
					)}
					{name.isDirty && (name.minLengthError || name.maxLengthError) && (
						<span className="auth-form__text">
							Имя должно содержать не меньше 2-х и не больше 30 символов
						</span>
					)}
					{name.isDirty && name.isNameError && (
						<span className="auth-form__text">Не верный формат</span>
					)}
					<input
						className="auth-form__input"
						name="name"
						id="name"
						type="name"
						value={name.value || ""}
						placeholder="Ваше имя"
						formNoValidate
						required
						autoComplete="off"
						onChange={name.handleChange}
						onBlur={name.onBlur}
					/>
				</>
			)}
			<label htmlFor="email" className="auth-form__subtitle">
				E-mail
			</label>
			{email.isDirty && email.isEmpty && (
				<span className="auth-form__text">Поле не может быть пустым</span>
			)}
			{email.isDirty && email.isEmailError && (
				<span className="auth-form__text">Не верный формат</span>
			)}
			<input
				className="auth-form__input"
				name="email"
				id="email"
				type="email"
				value={email.value || ""}
				placeholder="Ваша почта"
				formNoValidate
				required
				autoComplete="off"
				onChange={email.handleChange}
				onBlur={email.onBlur}
			/>
			<label htmlFor="password" className="auth-form__subtitle">
				Пароль
			</label>
			{password.isDirty && password.isEmpty && (
				<span className="auth-form__text">Поле не может быть пустым</span>
			)}
			{password.isDirty &&
				(password.minLengthError || password.maxLengthError) && (
					<span className="auth-form__text">
						Пароль должно содержать не меньше 4-х и не больше 20 символов
					</span>
				)}
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
				value={password.value || ""}
				placeholder="пароль"
				formNoValidate
				required
				autoComplete="off"
				onChange={password.handleChange}
				onBlur={password.onBlur}
			/>

			<span className="auth-form__span">{error}</span>

			<button
				className={
					window.location.pathname === "/sign-up"
						? "auth-form__button link"
						: "auth-form__button link auth-form__button_type_sign-in"
				}
				type="submit"
				disabled={
					window.location.pathname === "/sign-up"
						? !name.isValid || !email.isValid || !password.isValid
						: !email.isValid || !password.isValid
				}
			>
				{buttonSubmitText}
			</button>
			{props.children}
		</form>
	);
};

export default AuthForm;
