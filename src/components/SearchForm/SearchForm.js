import "./searchForm.css";

function SearchForm() {
	return (
		<form className="search-form">
			<div className="search-form__content">
				<input
					className="search-form__input"
					placeholder="Фильм"
					type="text"
          name='search'
					required
				/>
				<button type="submit" className="search-form__button link" />
			</div>
			<div className="search-form__checkbox">
				<label className="search-form__checkbox-label">
					<input
						className="search-form__checkbox-input"
						type="checkbox"
						id="checkbox"
            name='checkbox'
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
