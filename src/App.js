import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './Apollo/Client'
import Register from './Containers/Register/Regsiter'

import {Route }from 'react-router-dom'
import Login from './Containers/Login/Login'
import Home from './Containers/Home/Home'
function App() {
  const token = localStorage.getItem('token')
  if(!token){
      console.log("logout!!!")
      localStorage.removeItem('token')
      localStorage.removeItem('expirationDate')
    }
   else{
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if((expirationDate<=new Date())){
         console.log("logout")
         localStorage.removeItem('token')
         localStorage.removeItem('expirationDate')
      }else{  
          console.log("logedIn")
      }
    }
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <Route path='/' exact component={Home}/>
     <Route path='/register' exact component={Register}/>
     <Route path='/login' exact component={Login}/>
    </div>
    </ApolloProvider>
  );
}

export default App;
