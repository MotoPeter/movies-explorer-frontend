import "./searchForm.css";
import { useInput } from "../../hooks/useInput";
import React from "react";

function SearchForm({ onSubmit, error, handleCheckbox, cheked, ...props }) {
	//сабмит
	const [isSubmit, setIsSabmit] = React.useState(false);

  //получаем значение поиска
	const defaultSearh = window.localStorage.getItem("localSearch");

	//ввод поиска
	const search = useInput(
		window.location.pathname === "/movies" ? defaultSearh : "",
		{
			isEmpty: true,
		}
	);

	const onBlur = () => {
		setIsSabmit(false);
	};

	const Checkbox = () => {
		handleCheckbox();
	};

	//при сабмите
	const onSubmitSearch = (e) => {
		setIsSabmit(true);
		e.preventDefault();
		!search.isEmpty && onSubmit(search.value);
	};

	return (
		<form name="search-form" className="search-form" onSubmit={onSubmitSearch}>
			{isSubmit && search.isEmpty && (
				<span className="auth-form__text">Нужно ввести ключевое слово</span>
			)}
			<div className="search-form__content">
				<input
					className="search-form__input"
					placeholder="Фильм"
					type="text"
					name="search"
					required
					autoComplete="off"
					value={search.value || ""}
					onChange={search.handleChange}
					onBlur={onBlur}
				/>
				<button
					type="submit"
					className="search-form__button link"
					formNoValidate
				/>
			</div>
			<div className="search-form__checkbox">
				<label className="search-form__checkbox-label">
					<input
						className="search-form__checkbox-input"
						type="checkbox"
						id="checkbox"
						name="checkbox"
						onChange={Checkbox}
						checked={cheked}
					/>
					<span className="search-form__checkbox-span" />
				</label>
				<label htmlFor="checkbox" className="search-form__checkbox-title">
					Короткометражки
				</label>
			</div>
		</form>
	);
}

export default SearchForm;
