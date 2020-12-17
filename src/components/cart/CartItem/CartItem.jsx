import React from 'react';
import { Container, Card, CardActionArea, CardActions, CardMedia, CardContent, Button, Grid, Typography } from '@material-ui/core'; 
import useStyles from './styles';

import { ToastContainer, toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css';


const CartItem = ({ item, handleUpadteCartQty, handleRemoveFromCart }) => {
  const classes = useStyles();

const increaseCartQty = () => {
  return(
    handleUpadteCartQty(item.id, item.quantity + 1),
    toast.success('One item increased successfully.', {autoClose: 5000 })
  )
}

const decreaseCartQty = () => {
  return(
    handleUpadteCartQty(item.id, item.quantity - 1),
    toast.warning('One item decreased successfully.', {autoClose: 4000 })
  )
}
    return (
        <Card >
       
          <CardMedia className={classes.media} image={item.media.source} alt={item.name}  />
          <CardContent className={classes.cardContent}>
             <Typography variant='h5'>{item.name}</Typography>
             <Typography variant='h6'>{item.line_total.formatted_with_symbol}</Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
              <div className={classes.buttons}>
                   <Button type="button" size="small" onClick={decreaseCartQty}>-</Button>
                   <Typography>{item.quantity}</Typography>
                   <Button type="button" size="small" onClick={increaseCartQty}>+</Button>
              </div>
              <Button variant="contained" type="button" color="secondary" onClick={() =>handleRemoveFromCart(item.id) }>Remove</Button>
          </CardActions>
        
            
        </Card>


    )
}



export default CartItem
