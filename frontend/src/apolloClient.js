import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink
} from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client'
import {
  GRAPHQL_URL
} from './utils/variables';

const client = new ApolloClient({
  cache: new InMemoryCache(),

  link: createUploadLink({
    uri: `${GRAPHQL_URL}/graphql`,
  }),
});

export default client;
