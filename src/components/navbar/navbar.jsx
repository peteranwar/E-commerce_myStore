import React from 'react'
import { AppBar, Toolbar, IconButton, Badge,  Grid, Switch, Typography } from '@material-ui/core'; 
import { ShoppingCart } from '@material-ui/icons';

import logo from '../../assets/ecommerce-.jpg';
import useStyles from './styles';
import { Link, useLocation } from 'react-router-dom';

import WbSunnyOutlinedIcon   from '@material-ui/icons/WbSunnyOutlined';
import NightsStayOutlinedIcon from '@material-ui/icons/NightsStayOutlined';


const Navbar = ({totalItems, darkMode, handleDarkMode  }) => {

  const classes = useStyles();
  const location = useLocation();

 

    return (
        <>
        
          <AppBar position='fixed' className={classes.appBar} color='inherit'>
           <Toolbar>
            <Typography component={Link} to="/" className={classes.title} color='inherit' variant='h5'>
             <img src={logo} alt='E-commerce Store' height='30px' className={classes.image} />
               E-commerce Store 
            </Typography>
               
           </Toolbar>
           <div className={classes.grow} />
           <Typography variant="body2" component="div" style={{alignItems: 'center'}} >
                <Grid component="label" container alignItems="center" >
                  <Grid item>
                    <WbSunnyOutlinedIcon
                     style={{ fontSize: darkMode ? '15' : '25' }} 
                     color={darkMode ? 'disabled' : 'primary'} /></Grid>
                  <Grid item>
                  <Switch
                    defaultChecked
                    color="default"
                    checked={darkMode}
                    onChange={handleDarkMode}
                  />
                  </Grid>
                  <Grid item>
                    <NightsStayOutlinedIcon 
                    style={{ fontSize: darkMode ? '25' : 15 }}
                    color={darkMode ? 'secondary' : 'disabled'}
                    />
                    </Grid>
                </Grid>
               </Typography>
          {location.pathname === '/' && (
           <div>
              <IconButton className={classes.iconButton} component={Link} to="/cart" aria-label="Show cart item" color='inherit'>
                  <Badge badgeContent={totalItems} color='secondary'>
                    <ShoppingCart />
                  </Badge>
              </IconButton>
           </div>
          )}
          </AppBar>
          
        </>
    )
}

export default Navbar;
