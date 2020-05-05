import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  

const Navigation = (props) => {
  console.log(props.isAuth)
    const tokenExist = props.isAuth
    const[tokenAvailable,setTokenAvaiabe] = useState(tokenExist)
    const classes = useStyles();
    let button = null
    if(props.redirectpath==="Login"){
      if(props.token!==null &&props.isAuth){
        button = <Button color="inherit" onClick={()=>{
              localStorage.removeItem('token')
               localStorage.removeItem('expirationDate')
               setTokenAvaiabe(false)
               props.setIsAuth(false)
              
           }}>Logout</Button>
          
      }
      else{
        button =  <Button color="inherit" onClick={()=>props.history.push('/login')}>Login</Button>
      }
    }
    else{
      const token = localStorage.getItem('token')
      console.log(tokenAvailable)
      if(token!==null){
              button = <Button color="inherit" onClick={()=>{
                localStorage.removeItem('token')
                 localStorage.removeItem('expirationDate')
                 setTokenAvaiabe(false)
               }}>Logout</Button>
             }
             else{
              button =  <Button color="inherit" onClick={()=>props.history.push('/login')}>Login</Button>
             }
    }
    
    
    return (
            <div>
            <AppBar position="fixed">
  <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" className={classes.title}>
      Localize
    </Typography>
    {button}
  </Toolbar>
</AppBar>
            </div>
    )
}
export default Navigation