import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithHistory } from "./components/Auth0ProviderWithHistory.jsx";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <Auth0ProviderWithHistory>
          <Provider store={store}>
            <App />
          </Provider>
        </Auth0ProviderWithHistory>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
