import { makeStyles } from '@material-ui/core/styles';



export default makeStyles((theme) => ({
   footer: {
        background: '#2c387e',
        position: 'fixed',
        bottom: '0',
        width: '100%',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-around',
   },
   title: {
        textDecoration: 'none',
        padding: '0 4px',
        transition: 'all .4s ease-in-out',
        '&:hover': {color: '#ff639a'},
   },
   link: {
        textDecoration: 'none',
        fontSize: '16px',
        color: '#f9dc0b',
        
   }
}));