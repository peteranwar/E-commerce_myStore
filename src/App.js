import React, {useEffect, useState} from 'react';
import { Products, Navbar, Cart, Checkout, Footer} from './components';
import {Paper, Grid, Typography, Switch as AntSwitch } from '@material-ui/core/';

import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [darkMode, setDarkMode] = useState(getInitialMode());
 
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light"
    }
  });
  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkMode))
    
  }, [darkMode])
   
  function getInitialMode() {
    const isReturningUser = "dark" in localStorage;
    const savedMode = JSON.parse(localStorage.getItem("dark"));
    const userPrefersDark = getPrefColorScheme();
    
    // if mode was saved   dark or light
    if (isReturningUser) {
         return savedMode
    //if preferred color scheme is dark
    } else if (userPrefersDark) { 
         return true;
    //otherwise light
    } else { 
         return false;
    }
  }
  function getPrefColorScheme() {
    if (!window.matchMedia) return;

      return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };
  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
  
    setProducts(data);
  }

  const fetchCart = async () => {
      setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async(productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity)
     
    return(
      toast.success('one product has been successfully added.', {autoClose: 5000 }),
      setCart(cart)
    )
  }

  const handleUpadteCartQty = async (productId, quantity) =>{
     const { cart } = await commerce.cart.update(productId, { quantity })
  
    setCart(cart);
  }

   const handleRemoveFromCart = async (productId) =>{
     const { cart } = await commerce.cart.remove(productId);

      return(
      toast.warning('One product has been removed successfully.', {autoClose: 5000 }),
      setCart(cart)
    )
  }

    const handleEmptyCart = async () =>{
     const { cart } = await commerce.cart.empty()
  
     return(
      toast.warning('The cart is empty now.', {autoClose: 5000 }),
      setCart(cart)
    )
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
     
      setOrder(incomingOrder);
      refreshCart();
    
    } catch (error) {
      setErrorMessage(error.data.error.message);

    }
  }

  useEffect(() => {
        fetchProducts();
        fetchCart();
  }, [])

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  return (
    <ThemeProvider theme={theme}>
     <Router >
      <Paper  >
      <ToastContainer /> 
        <Navbar handleDarkMode={handleDarkMode} darkMode={darkMode} totalItems={cart.total_items} handleDrawerToggle={handleDrawerToggle} />
        <div style={{paddingBottom: '60px'}}>
            <Switch>
              <Route exact path="/">
                  <Products products={products} onAddToCart={handleAddToCart} />
              </Route>    
            </Switch>
            <Switch>
              <Route exact path="/cart">
                <Cart
                cart={cart}
                handleUpadteCartQty={handleUpadteCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
                  />
              </Route> 
              <Route exact path="/checkout">
                  <Checkout
                    cart={cart} 
                    order={order}
                    handleCaptureCheckout={handleCaptureCheckout}
                    error={errorMessage}
                    refreshCart={refreshCart}
                    />
              </Route>
            </Switch>
        </div>
        <Footer  />
      </Paper>
     </Router>
    </ThemeProvider>
  );
}

export default App;
