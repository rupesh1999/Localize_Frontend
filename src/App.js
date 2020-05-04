import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import Component from './component';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: "https://salty-thicket-40672.herokuapp.com/"
});

const client = new ApolloClient({
    cache,
    link
});


function App() {

    return (
        <ApolloProvider client={client}>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
                <Component />
            </div>
        </ApolloProvider>
    );
}

export default App;
