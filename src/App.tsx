import { MantineProvider } from '@mantine/core';
import './App.css';
import { PageHeader } from './components/PageHeader/PageHeader';
import { ItemCard } from './components/Card/ItemCard';
import { Provider } from 'react-redux';
import store from './store/store';
import { CardList } from './components/CardList/CardList';

function App() {
  return (
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <div className="App">
          <PageHeader/>
          <CardList/>
        </div>
      </MantineProvider>
    </Provider>
    
  );
}

export default App;
