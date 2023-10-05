import { useState, useEffect, useRef } from 'react';

import FilterContext from './shopSections/Filters/FIlterContext';

import Wine from './shopSections/wine';
import PrePage from '../prePage/prePage';

import SearchBar from './shopSections/searchBar';
import Filters from './shopSections/Filters/Filters';
import Vintus from './shopSections/Vintus';

import useFilterWines from '../../Hooks/use-filterWines';
import useFilter from '../../Hooks/use-filters';


const Shop = ()=>{

  const [brands,setBrands]=useState([])
  const [wines,setWines]=useState([])
  const [filteredWines,setFilteredWines]=useState([])

  const biggestPrice=useRef(null);

  const [filters,setType,setBrand,setUpTo,setFrom,setSearch]=useFilter()
  const filterWinesHandler = useFilterWines(wines,filters,setFilteredWines)
  
  


  useEffect(() => {
  
      fetch("https://vinotecareact-default-rtdb.firebaseio.com/wines.json")
        .then((response) => response.json())
        .then((data) => {
          setWines([...Object.values(data)]);
          setFilteredWines([...Object.values(data)]);

          let lBrands = [];
          [...Object.values(data)].forEach((wine) => {
            if (!lBrands.includes(wine.brand.toLowerCase())) {
              lBrands.push(wine.brand.toLowerCase());
              setBrands([...lBrands]);
            }
          });

          let winePrices = [...Object.values(data)].map((wine) => wine.price);
          biggestPrice.current = Math.max(...winePrices);
        })
        .catch((error) => {
          console.error("Error fetching wine data:", error);
        });
  }, [])


 useEffect(() => {
  console.log("t")
  filterWinesHandler();
}, [filters, filterWinesHandler]); 

    return(
        <main>
          <section className="wine">
          <PrePage title={"Catalogo"}/>
          </section>
          <SearchBar setSearch={setSearch}/> 

        <section className="filter_flexbox">  
        
        <FilterContext.Provider 
           value={
           { brands:brands,
           setType:setType, 
           setBrand:setBrand, 
           setUpTo:setUpTo, 
           setFrom:setFrom,
           filters:filters, 
           biggestPrice:biggestPrice}}
           >
          <Filters/>
        </FilterContext.Provider>

          <article className="wine_experience">
              {
                filteredWines.map((wine) =>{
                  return(
                    <Wine wine={wine} key={wine.name}/>
                  )
                })
              }
          </article>  
        </section>

        <Vintus/>
        </main>
   
    )
}
export default Shop