import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  
  media: {
    height: 300,
    transition: 'all .4s ease-in',
    '&:hover': {transform: 'scale(.9)'},
  },
 
   
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardActions: {
    justifyContent: 'space-between',
    
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
}));