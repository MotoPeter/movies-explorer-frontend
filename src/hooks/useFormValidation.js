//хук валидации формы
import { useEffect } from "react";
import React from "react";

//принимаем значение инпутов и валидации
export function useFormValidation(value, validations) {
	//состояние пустого и не пустого ввода
	const [isEmpty, setIsEmpty] = React.useState(true);
	//ошибка длинны ввода
	const [minLengthError, setMinLengthError] = React.useState(false);
	const [maxLengthError, setMaxLengthError] = React.useState(false);
	//ошибка ввода почтового адреса
	const [isEmailError, setIsEmailError] = React.useState(false);
	//ошибка ввода имени
	const [isNameError, setIsNameError] = React.useState(false);
	//все поля
	const [isValid, setIsValid] = React.useState(false);
  //проверка изменений
  const [ isChanges, setIsChanges] = React.useState(false)

	//срабатывает при изменении значения инпута
	useEffect(() => {
		//в цикле проходимся по обекту валидации
		for (const validation in validations) {
			// eslint-disable-next-line default-case
			switch (validation) {
				//проверка на пустоту
				case "isEmpty":
					//если поле не пустое
					value ? setIsEmpty(false) : setIsEmpty(true);
					break;
				case "minLengthError":
					//если длинна ввода меньше переданного значения в массиве валидаций
					value.length > 0 && value.length < validations[validation]
						? setMinLengthError(true)
						: setMinLengthError(false);
					break;
				case "maxLengthError":
					//если длинна ввода меньше переданного значения в массиве валидаций
					value.length > validations[validation]
						? setMaxLengthError(true)
						: setMaxLengthError(false);
					break;
				case "isEmailError":
					//валидация почты
					const reEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
					value.length > 0 && !reEmail.test(value.toLowerCase())
						? setIsEmailError(true)
						: setIsEmailError(false);
					break;
				case "isNameError":
					//валидация имени
					const reName = /^[a-zа-яё\s\-]+$/iu;
					value.length > 0 && !reName.test(value.toLowerCase())
						? setIsNameError(true)
						: setIsNameError(false);
					break;
          case "isChanges":					
					value === validations[validation]
						? setIsChanges(false)
						: setIsChanges(true);
					break;
			}
		}
	}, [value]);

  //при изменении любого из параметров валидации проверяем общую валидность инпута
	useEffect(() => {
		if (
			isEmpty ||
			minLengthError ||
			maxLengthError ||
			isEmailError ||
			isNameError
		) {
			setIsValid(false);
		} else {
			setIsValid(true);
		}
	}, [isEmpty, minLengthError, maxLengthError, isEmailError, isNameError, isChanges]);

	return { isEmpty, minLengthError, maxLengthError, isEmailError, isNameError, isValid, isChanges };
}
