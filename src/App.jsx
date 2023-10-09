import { useState } from 'react';
import './Components/SASS/Syles.scss';
import Cart from './Components/cart/Cart';
import Menu from "./Components/menu/menu"
import Alta from './Components/alta/alta';
import SobreNosotros from './Components/sobreNosotros/sobreNosotros';
import Contactos from './Components/contactos/contactos';
import Shop from './Components/shop/shop';
import { Route, Routes } from 'react-router-dom';
import useCart from './Hooks/use-cart';
import CartContext from './Components/cart/CartContext';
import 'font-awesome/css/font-awesome.min.css';
import Footer from './Components/footer/footer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  

  const [cartDysplay,setCartDisplay]=useState("")
  const [cartItems,addToCartHandler,reduce,increase]=useCart();

  const showCart = ()=>{
    setCartDisplay(()=>cartDysplay===""?"show":"")
  }


  return (
    <CartContext.Provider value={{onAdd:addToCartHandler}} >
    <>
    <Cart displayState={cartDysplay} cartItem={cartItems} onIncrease={increase} onReduce={reduce} />
    <Menu setDisplayState={showCart}/>
    <ToastContainer
    position="top-center"
    autoClose={1500}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark" />
    <Routes>
    <Route path="/Alta" element={<Alta />} />
        <Route path="/sobreNosotros" element={<SobreNosotros />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/*" element={<Shop/>} />
    </Routes>
    <Footer/>
  </>
  </CartContext.Provider>
  );
}

export default App;
