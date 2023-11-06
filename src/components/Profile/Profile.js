import "./profile.css";
import { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import { useInput } from "../../hooks/useInput";

const Profile = ({ handleNavPopup, logOutProfile, onSubmit, error }) => {
	//через контекст получаем инфу о пользователе
	const currentUser = useContext(CurrentUserContext);
	//состояние кнопок формы
	const [isVisibleButton, setVisibleButton] = useState(false);
	////получение данных из инпутов
	//ошибка
	const [isChanged, setIsChanged] = useState(false);

	//ввод имя
	const name = useInput(currentUser.name, {
		isEmpty: true,
		minLengthError: 2,
		maxLengthError: 30,
		isNameError: true,
		isChanges: currentUser.name,
	});

	//ввод почта
	const email = useInput(currentUser.email, {
		isEmpty: true,
		isEmailError: true,
		isChanges: currentUser.email,
	});

	//сабмит кнопки
	const handleProfilSubmit = (evt) => {
		evt.preventDefault();
		onSubmit(name.value, email.value);
		//при сабмите отправка обновленных данных
	};

	const handleVisibleButton = () => {
		setVisibleButton(true);
	};

	return (
		<section className="profile">
			<Header isLoggedIn={true} onNavPopup={handleNavPopup} />
			<main className="profile__content">
				<form
					className="profile__form"
					name={"profile"}
					onSubmit={handleProfilSubmit}
				>
					<h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
					<div>
						{name.isDirty && name.isEmpty && (
							<div className="profile__text">Поле не может быть пустым</div>
						)}
						{name.isDirty && (name.minLengthError || name.maxLengthError) && (
							<div className="profile__text">
								Имя должно содержать не меньше 2-х и не больше 30 символов
							</div>
						)}
						{name.isDirty && name.isNameError && (
							<span className="profile__text">Не верный формат</span>
						)}
						<div className="profile__info profile__info_type_name">
							<h3 className="profile__subtitle">Имя</h3>
							<input
								className="profile__input"
								name="name"
								id="name"
								type="name"
								placeholder={name.value.length === 0 ? "" : currentUser.name}
								disabled={!isVisibleButton}
								value={name.value}
								minLength="5"
								maxLength="50"
								required
								autoComplete="off"
								onChange={name.handleChange}
								onBlur={name.onBlur}
							/>
						</div>
						{email.isDirty && email.isEmpty && (
							<div className="profile__text">Поле не может быть пустым</div>
						)}
						{email.isDirty && email.isEmailError && (
							<div className="profile__text">Не верный формат</div>
						)}
						<div className="profile__info">
							<h3 className="profile__subtitle">E-mail</h3>
							<input
								className="profile__input"
								name="email"
								id="email"
								type="email"
								value={email.value || ""}
								placeholder={currentUser.email}
								disabled={!isVisibleButton}
								minLength="5"
								maxLength="50"
								required
								autoComplete="off"
								onChange={email.handleChange}
								onBlur={email.onBlur}
							/>
						</div>
					</div>
					<span className="auth-form__span">{error}</span>
					{!isVisibleButton ? (
						<>
							<button
								className="profile__button link"
								type="button"
								onClick={handleVisibleButton}
							>
								Редактировать
							</button>
							<button
								className="profile__log-out"
								type="button"
								onClick={logOutProfile}
							>
								Выйти из аккаунта
							</button>
						</>
					) : (
						<>
							<span
								className={
									isChanged
										? "profile__span profile__span_show "
										: "profile__span profile__span_hide"
								}
							>
								При обновлении профиля произошла ошибка.
							</span>
							<button
								className={
									!isChanged
										? "profile__submit link"
										: "profile__submit profile__submit_error link"
								}
								type="submit"
								onClick={handleProfilSubmit}
								disabled={
									!name.isValid ||
									!email.isValid ||
									(!name.isChanges && !email.isChanges)
								}
							>
								Сохранить
							</button>
						</>
					)}
				</form>
			</main>
		</section>
	);
};

export default Profile;
