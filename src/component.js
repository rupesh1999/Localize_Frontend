import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from '@apollo/react-hooks';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';


const Users = gql`
    {
        users {
            name
            email
        }
    }
`;


const Login = gql`
  mutation login($email: String! , $password: String!) {
    login(data: {
        email: $email,
        password: $password
    }) {
      token
      user{
          name
          email
      }
    }
  }
`;

const Component = () => {
    const [login, { data , loading }] = useMutation(Login);
    if (loading) return "Loading...";
    return (
        <div>
            <h1>data</h1>
            <button onClick={() => login({variables: {email: "xyz@123.com" , password: "abc123"}})}>Click me</button>
            <h1>{data && data.login.user.name}</h1>
        </div>
    );
};

export default Component;
