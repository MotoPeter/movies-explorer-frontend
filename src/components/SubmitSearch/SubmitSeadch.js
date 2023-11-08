//функция сортировки массива по поиску
export default function useSubmitSearch(arr, search) {
  //фильтруем по поиску
  let filterMovies = arr.filter((item) => {
    if (item.nameRU.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    if (item.nameEN.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
  });
return filterMovies
}