import "./profile.css";
import { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import { useForm } from "../../hooks/useForm";

const Profile = ({ handleNavPopup, logOutProfile }) => {
	//через контекст получаем инфу о пользователе
	const currentUser = useContext(CurrentUserContext);
	//состояние кнопок формы
	const [isVisibleButton, setVisibleButton] = useState(false);
	//получение данных из инпутов
	const { values, handleChange, setValues } = useForm({});
	//ошибка
	const [isChanged, setIsChanged] = useState(true);

	//сабмит кнопки
	const handleProfilSubmit = (evt) => {
		evt.preventDefault();
		setVisibleButton(false);
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
						<div className="profile__info">
							<h3 className="profile__subtitle">Имя</h3>
							<input
								className="profile__input"
								name="name"
								id="name"
								type="name"
								placeholder={currentUser.name}
								disabled={!isVisibleButton}
								value={values.name || ""}
								minLength="5"
								maxLength="50"
								required
								autoComplete="off"
								onChange={handleChange}
							/>
						</div>
						<div className="profile__info">
							<h3 className="profile__subtitle">E-mail</h3>
							<input
								className="profile__input"
								name="email"
								id="email"
								type="email"
								value={values.email || ""}
								placeholder={currentUser.email}
								disabled={!isVisibleButton}
								minLength="5"
								maxLength="50"
								required
								autoComplete="off"
								onChange={handleChange}
							/>
						</div>
					</div>
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
