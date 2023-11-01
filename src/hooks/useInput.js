import React from "react";
import { useFormValidation } from "./useFormValidation";

export const useInput = (initialValue, validations) => {
	//переменная значения ввода
	const [value, setValue] = React.useState(initialValue);
	//состояние фокуса
	const [isDirty, setIsDerty] = React.useState(false);
	//возвращаем ошибки из хука
	const valid = useFormValidation(value, validations);

	//получение значений инпутов
	const handleChange = (event) => {
		//меняем переменную состояния добавляя в массив инпутов полученное имя и значение
		setValue(event.target.value);
	};

  //функция фокуса инпута
	const onBlur = (event) => {
		setIsDerty(true);
	};
	return { value, handleChange, onBlur, isDirty, ...valid };
};
