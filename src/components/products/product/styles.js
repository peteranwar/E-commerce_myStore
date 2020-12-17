import { makeStyles } from "@material-ui/core/styles";





export default makeStyles(() =>({
    root: {
        maxWidth: '100%'
    },
    media: {
        height: 100,
        paddingTop: '56.25%', 
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    iconButton:{
        transition: 'all .4s ease-in-out',
        '&:hover': {color: '#ff639a', transform: ' translateY(-5px) scale(1.2)'},
  },
    
}));