import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./firebase"
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { store } from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <App />
        </MantineProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
