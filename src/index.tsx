import ReactDOM from "react-dom";

import "antd/dist/antd.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  // ? .env dosyası üzerinden "REACT_APP_" başlayan tüm değişkenler dotenv gibi kullanılabilir.
  uri: process.env.REACT_APP_GRAHQL_ENDPOINT,
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
