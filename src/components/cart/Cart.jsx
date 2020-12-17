import React from 'react';
import { Container, Button, Grid, Typography } from '@material-ui/core'; 
import CartItem from './CartItem/CartItem';
import useStyles from './styles';
import { Link } from 'react-router-dom';

const Cart = ({ cart, handleUpadteCartQty, handleRemoveFromCart, handleEmptyCart }) => {

  const classes = useStyles();

// Render Empty Cart Component
  const EmptyCart = () => (
          <Typography  variant="subtitle1" >
           You have no items in your shopping cart,  
           <Link to="/" className={classes.link}>start adding some!</Link>
         </Typography>
  ); 


// Render Filled Cart Component
  const FilledCart = () => (
      <>
        <Grid container spacing={3}>
           {cart.line_items.map((item) =>(
               <Grid item xs={12} sm={6}  md={4} key={item.id}>
                <CartItem item={item} handleUpadteCartQty={handleUpadteCartQty} handleRemoveFromCart={handleRemoveFromCart} />
              </Grid>
           ))}

        </Grid>
        <div style={{display: 'flex'}}> 
         <Typography variant='h4' style={{margin: 'auto', padding: '22px 0'}}>
           Subtotal: <strong> { cart.subtotal.formatted_with_symbol} </strong>
            
           <div  style={{ padding: '18px 0'}}>
             <Button className={classes.emptyButton} onClick={handleEmptyCart} size='large' type='button' variant='contained' color='secondary'>
              Empty Cart
             </Button>
             <Button component={Link} to="/checkout"  className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary'>
              Checkout
             </Button>
           </div>

         </Typography>
        </div>

      </>
  );

if (!cart.line_items) return 'Loading...';
    return (
        <Container>
         <div className={classes.toolbar}/>
         <Typography className={classes.title} variant="h4" gutterBottom>
           Your Shopping Cart
         </Typography>
         { !cart.line_items.length  ? <EmptyCart /> : <FilledCart />}
            
        </Container>
    )
}


export default Cart;

