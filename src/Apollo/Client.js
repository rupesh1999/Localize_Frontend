import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat,from } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = new HttpLink({ uri: 'https://salty-thicket-40672.herokuapp.com/' });

const defaults = {
 
    isConnected: true
};

const resolvers = {
  Mutation: {
  updateNetworkStatus: (_, { isConnected }, { cache }) => {
    cache.writeData({ data: { isConnected }});
    return null;
  }
}
}
const cache = new InMemoryCache();

const stateLink = withClientState({
  resolvers,
  cache,
  defaults
});

const authMiddleware = new ApolloLink((operation, forward) => {
  
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') || null,
    }
  });

  return forward(operation);
})
const link = ApolloLink.from([stateLink,authMiddleware,httpLink])
const client = new ApolloClient({
  link: link,
  cache:new InMemoryCache(),
  connectToDevTools: true
});
export default client