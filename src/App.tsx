import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import light from './styles/themes/light';
import dark from './styles/themes/dark';
import GlobalStyle from './styles/global';
// import Routes from './routes';

import Dashboard from './pages/Dashboard';
import Repository from './pages/Repository';

const App: React.FC = () => {
  const [theme, setTheme] = useState(light);

  const toggleTheme = (): void => {
    setTheme(theme.title === 'light' ? dark : light);
    console.log(theme);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <Dashboard toggleTheme={toggleTheme} />}
              // component={Dashboard}
            />
            <Route path="/repositories/:repository+" component={Repository} />
          </Switch>
        </BrowserRouter>
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
};

export default App;
