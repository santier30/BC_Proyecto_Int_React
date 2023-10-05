import useForm from "../../Hooks/use-form"
import usePost from "../../Hooks/usePost"
import { useState } from "react"
import useError from "../../Hooks/use-error";
import PrePage from '../prePage/prePage';

import Name from "./altaArticles/name";
import Price from "./altaArticles/price";
import Category from "./altaArticles/category";
import Brand from "./altaArticles/brand";
import Stock from "./altaArticles/stock";
import Img from "./altaArticles/img";
import Descriptions from "./altaArticles/Descriptions";

const Alta = ()=>{
  const makeError = useError()
const [alta,setName, setPrice, setCategory, setBrand, setStock, setImg, setShortDes, setLongDes,reset] = useForm()
const [sub,setSub] = useState(false)
const post = usePost()
const submitHandler = (event)=>{
    event.preventDefault();
    if (
        alta.name.er==="" && alta.price.er==="" && alta.category.er==="" && alta.brand.er==="" && alta.stock.er===""&& alta.img.er===""  && alta.shortDes.er==="" && alta.longDes.er===""
      ){
        const newWine = {
            "name": alta.name.value.trim().replace(/\s+/g, ' '),
            "category": alta.category.value,
            "brand": alta.brand.value.trim().replace(/\s+/g, ' '),
            "image": alta.img.value ,
            "short_description": alta.shortDes.value.trim().replace(/\s+/g, ' ') ,
            "long_description":  alta.longDes.value.trim().replace(/\s+/g, ' '),
            "price": alta.price.value ,
            "stock": parseInt(alta.stock.value)>99?"99+": alta.stock.value
          };
        post(newWine,"https://vinotecareact-default-rtdb.firebaseio.com/wines.json")

        setSub(false)
        reset()


      }else{setSub(true)}
}

    return(
        <main>


      <section className="Alta">
      <PrePage title={"Alta"}/>
    
        <article className="Alta_body">
          <form className="form" id="personalInfo" onSubmit={submitHandler}>
            <section>

            <Name name={alta.name} setName={setName} makeError={makeError}/>

            <Price price={alta.price} setPrice={setPrice} makeError={makeError}/>
            </section>
        
            <section>

                <Category category={alta.category} setCategory={setCategory} sub={sub}/>

                <Brand brand={alta.brand} setBrand={setBrand} makeError={makeError}/>

            </section>
        
            <section>

            <Stock stock={alta.stock} setStock={setStock} makeError={makeError}/>

            <Img img={alta.img} setImg={setImg} makeError={makeError}/>

            </section>
        
            <Descriptions shortDes={alta.shortDes} setShortDes={setShortDes} longDes={alta.longDes} setLongDes={setLongDes} makeError={makeError}/>
        
            <div className="submit-Div">
            <input id="reset" type="reset" value="CANCELAR" onClick={()=>{reset();setSub(false)}}/>
            <input id="sub" type="submit" value="ENVIAR"/>
          </div>
        </form>
        

        </article>

      </section>

      </main>
    )
}
export default Alta