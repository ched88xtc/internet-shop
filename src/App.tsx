import { MantineProvider } from "@mantine/core";
import "./App.css";
import { PageHeader } from "./components/PageHeader/PageHeader";
import { Provider } from "react-redux";
import store from "./store/store";
import { CardList } from "./components/CardList/CardList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Cart } from "./components/Cart/Cart";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <div className="App">
            <PageHeader/>
            <Routes>
              <Route path="/" element={<CardList/>}/>
              <Route path="/cart" element={<Cart/>}/>
            </Routes>
          </div>
        </MantineProvider>
      </BrowserRouter>
    </Provider>
    
  );
}

export default App;
