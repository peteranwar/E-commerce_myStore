import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuButton, Menu, Typography } from '@material-ui/core'; 
import { ShoppingCart } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import logo from '../../assets/ecommerce-.jpg';
import useStyles from './styles';


const Footer = () => {

  const classes = useStyles();



    return (
        <div className={classes.footer}>
          <p>All Rights Reserved  © 2020.</p>
            <div>
            <Typography component={Link} to="/" className={classes.title}  color='inherit' variant='subtitle1'>
              E-commerce Store  
            </Typography>
            by:   <a href="https://peteranwar.github.io/portfolio/" className={classes.link} target="_blank"> Peter Anwar</a>
            </div>
       
           
           
        
          
            
        </div>
    )
}

export default Footer;
