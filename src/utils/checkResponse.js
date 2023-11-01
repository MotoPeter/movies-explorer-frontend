//функция проверки ответа от сервера
export let errorName='fff'
export function checkResponse(res) {
	if (res.ok) {
		return res.json();
	}
  res.json().then((e) => {errorName = (Object.values(e).toString())})
	return  Promise.reject(`Ошибка: ${res.status}`);
}

