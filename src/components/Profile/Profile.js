import "./profile.css";
import { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import { useForm } from "../../hooks/useForm";

const Profile = ({ handleNavPopup, logOutProfile }) => {
	//через контекст получаем инфу о пользователе
	const currentUser = useContext(CurrentUserContext);
	//состояние активности кнопки
	const [isVisibleButton, setVisibleButton] = useState(false);
	//получение данных из инпутов
	const { values, handleChange, setValues } = useForm({});

	//сабмит кнопки
	const handleProfilSubmit = (evt) => {
		evt.preventDefault();

		//при сабмите отправка обновленных данных
	};

	return (
		<div className="profile">
			<Header isLoggedIn={true} onNavPopup={handleNavPopup} />
			<main>
				<form
					className="profile__form"
					name={"profile"}
					onSubmit={handleProfilSubmit}
				>
					<h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
					<div>
						<div className="profile__info">
							<h3 className="profile__subtitle">Имя</h3>
							<input
								className="profile__input"
								name="name"
								id="name"
								type="name"
								placeholder={currentUser.name}
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
								minLength="5"
								maxLength="50"
								required
								autoComplete="off"
								onChange={handleChange}
							/>
						</div>
					</div>
					<button
						className="profile__button link"
						disabled={!isVisibleButton}
						type="submit"
					>
						Редактировать
					</button>
				</form>
				<button
					className="profile__log-out"
					type="button"
					onClick={logOutProfile}
				>
					Выйти из аккаунта
				</button>
			</main>
		</div>
	);
};

export default Profile;
