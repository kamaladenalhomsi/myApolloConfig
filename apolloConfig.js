import { ApolloLink } from 'apollo-link';

import { HttpLink } from 'apollo-link-http';

import { InMemoryCache } from 'apollo-cache-inmemory';

 

export default ({ store, env }) => {

  const httpLink = new HttpLink({ uri: env.GRAPH_BASE_URL });

 

  // middleware

  const middlewareLink = new ApolloLink((operation, forward) => {

    const token = store.getters['auth/GET_TOKEN'];

    if (token) {

      operation.setContext({

        headers: { authorization: Bearer ${token} }

      });

    }

 

    return forward(operation);

  });

  const link = middlewareLink.concat(httpLink);

  return {

    link,

    cache: new InMemoryCache()

  };

};