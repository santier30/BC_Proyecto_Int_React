import {  useCallback } from 'react';

function useFilterWines(wines, filters , setFilteredWines) {
 

  const filterWinesHandler = useCallback(() => {
    let filteredWines = [...wines];
    let x = [];
    const { type, brand, priceRange, search } = filters;

    if (type[0]) {
      for (let i of type) {
        x = [...x, ...filteredWines.filter((wine) => wine.category === i)];
      }
      filteredWines = [...x];
      x = [];
    }

    if (brand[0]) {
      for (let i of brand) {
        x = [...x, ...filteredWines.filter((wine) => wine.brand.toLowerCase() === i.toLowerCase())];
      }
      filteredWines = [...x];
    }

    if (priceRange.upTo > 0) {
      x = [...filteredWines.filter((wine) => Math.floor(wine.price) <= priceRange.upTo)];
      filteredWines = [...x];
    }

    if (priceRange.from > 0) {
      x = [...filteredWines.filter((wine) => Math.floor(wine.price) >= priceRange.from)];
      filteredWines = [...x];
    }

    if (search !== '') {
      const regex = new RegExp(search.replace(/\s+/g, '\\s*'), 'i');
      x = [...filteredWines.filter((wine) => regex.test(wine.name.replace(/\s/g, '')))];
      filteredWines = [...x];
    }

    setFilteredWines(filteredWines);
  }, [wines, filters,setFilteredWines]);



  return filterWinesHandler;
}

export default useFilterWines;
