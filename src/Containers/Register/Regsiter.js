import React, { useState } from 'react'
import gql from 'graphql-tag';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useMutation} from '@apollo/react-hooks'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import styles from './Register.module.css'
import Navigation from '../../Components/Layout/Navigation'
import {Redirect} from 'react-router-dom'
const Register = (props)=>{
    const REGISTER_MUTATION = gql`
    mutation AddUser($email:String!,$password:String!,$name:String!){
        addUser(data:{email:$email,password:$password,name:$name}){
          name
          email
          
        }
      }
    `
    const [redireact] = useState(false)
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [addUser,{loading,error}] = useMutation(REGISTER_MUTATION)
    console.log(error)
    const sendData = ()=>{
    addUser({ variables: { password:password,email:email ,name:name} })
    
      
    
    }
    let redireactComp = null
    if(redireact){
        redireactComp = <Redirect to="/login"/>
    }
   
    let content = (
        <form className={styles.formstyle}>

        <FormControl>
            <TextField
                label="Name"
                value={name}
                margin="normal"
                fullWidth
                onChange={(e)=>setName(e.target.value)}
            />
            
        </FormControl>
    
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
            <Button variant="contained" size="medium" color="primary" onClick={sendData} className={styles.margin + " " + styles.btn}>
                Register
            </Button>
            {/* <div className={styles.register}>

            <p className={styles.register2}>Already have an account? </p>
                <Link to = "/register" className={styles.registerLink}>Login here</Link>
            </div> */}
        </FormControl>

    </form>
    )
    if(loading){
        content = <div className={styles.loading}><CircularProgress/></div>
    }


    return(
        <div>
            <Navigation {...props}/>
            <div align="center" className={styles.hero}>
                <div className={styles.style}>
              {redireactComp}
                <h2>Register</h2>
                  {content}
                  
                </div>
            </div>

        </div>
    )
}
export default Register