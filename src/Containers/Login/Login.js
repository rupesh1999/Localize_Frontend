import React, { useState } from 'react'
import gql from 'graphql-tag';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useMutation} from '@apollo/react-hooks'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import styles from './Login.module.css'
import {Link} from 'react-router-dom'
import Navigation from '../../Components/Layout/Navigation'

const Login= (props)=>{
    const LOGIN_MUTATION = gql`
    mutation Login($email:String!,$password:String!){
        login(data:{email:$email,password:$password}){
           token
          
        }
      }
    `
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [isAuth,setIsAuth] = useState(localStorage.getItem('token')!=null)
    const [addUser,{loading,data,error}] = useMutation(LOGIN_MUTATION)
    console.log(data)

    const login= ()=>{
    addUser({ variables: { password:password,email:email} }).then(({data,client})=>{
        localStorage.setItem('token',data.login.token)
        const expirationDate =  new Date((new Date().getTime() +3600*1000))
        localStorage.setItem('expirationDate',expirationDate)
        setIsAuth(localStorage.getItem('token')!=null)
        props.history.push('/location')
       
      
    }).catch(e=>{
        console.log("Unable to login")
    })
    }
    let ErrorMessage = null
    if(error){
        ErrorMessage =  <p>Unable to login</p>
    }
    
   
    let content = (
        <form className={styles.formstyle}>
        {ErrorMessage}
        <FormControl>
            <TextField
                label="Email"
                value={email}
                margin="normal"
                fullWidth
                onChange={(e)=>setEmail(e.target.value)}
            />
            <FormHelperText id="email-helper-text">We'll never share your email.</FormHelperText>
        </FormControl>
    
        <FormControl>
            <TextField
                label="Password"
                value={password}
                className={styles.TextFieldStyle} type="password"
                margin="normal"
                fullWidth
                onChange={(e)=>setPassword(e.target.value)}
            />
        </FormControl>
        <br /><br />
        <FormControl>
            <Button variant="contained" size="medium" color="primary" onClick={login} className={styles.margin + " " + styles.btn}>
                Login
            </Button>
            <div className={styles.register}>

            <p className={styles.register2}>Don't have an account? </p>
                <Link to = "/register" className={styles.registerLink}>Sign Up here</Link>
            </div>
        </FormControl>

    </form>
    )
    if(loading){
        content = <div className={styles.loading}><CircularProgress/></div>
    }
    console.log(isAuth)
    
    return(
        <div>
            <Navigation {...props} redirectpath = "Login" isAuth = {isAuth} setIsAuth={setIsAuth} />
            <div align="center" className={styles.hero}>
                <div className={styles.style}>
              
                <h2>Login</h2>
                {content}
                </div>
            </div>
        </div>
    )
}
export default Login