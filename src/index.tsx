import ReactDOM from "react-dom";

import "antd/dist/antd.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";

// ? .env dosyası üzerinden "REACT_APP_" başlayan tüm değişkenler dotenv gibi kullanılabilir.
const graphQLEndPoint: string =
  typeof process.env.REACT_APP_GRAHQL_ENDPOINT == "undefined"
    ? ""
    : process.env.REACT_APP_GRAHQL_ENDPOINT;
const graphQLWebSocket: string =
  typeof process.env.REACT_APP_GRAHQL_WEBSOCKET == "undefined"
    ? ""
    : process.env.REACT_APP_GRAHQL_WEBSOCKET;

// * Create an http link:
const httpLink: HttpLink = new HttpLink({
  uri: graphQLEndPoint,
});

// * Create a WebSocket link:
const wsLink: WebSocketLink = new WebSocketLink({
  uri: graphQLWebSocket,
  options: {
    reconnect: true,
  },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link: ApolloLink = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

// ? react-router-dom altıncı varyasyonunda "BrowserRouter" ile sarmalama yapılıyor.
ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
