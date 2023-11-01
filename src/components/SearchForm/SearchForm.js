import "./searchForm.css";
import { useInput } from "../../hooks/useInput";

function SearchForm ({onSubmit, error, handleCheckbox, ...props}) {

  //ввод поиска
	const search = useInput("", {
		isEmpty: true,
	});

  //при сабмите
	const onSubmitSearch = (e) => {
		e.preventDefault();
		onSubmit(search.value);
	};
	return (
		<form name="search-form" className="search-form" onSubmit={onSubmitSearch}>
       {search.isDirty && search.isEmpty && (
						<span className="auth-form__text">Поле не может быть пустым</span>)}
			<div className="search-form__content">
				<input
					className="search-form__input"
					placeholder="Фильм"
					type="text"
					name="search"
					required
          onChange={search.handleChange}
					onBlur={search.onBlur}
				/>
				<button type="submit" className="search-form__button link" disabled={!search.isValid} />
			</div>
			<div className="search-form__checkbox">
				<label className="search-form__checkbox-label">
					<input
						className="search-form__checkbox-input"
						type="checkbox"
						id="checkbox"
						name="checkbox"
            onChange={handleCheckbox}
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
