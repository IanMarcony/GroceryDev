import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MenuContainer from './components/MenuContainer';
import AppProvider from './hooks';
import Routes from './routes';

import GlobalStyles from './styles/global';

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <MenuContainer />
        <Routes />
        <GlobalStyles />
      </AppProvider>
    </Router>
  );
};

export default App;
