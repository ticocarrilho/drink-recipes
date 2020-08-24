import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import theme from './theme';
import MainPage from './pages/MainPage';
import IngredientSearchPage from './pages/IngredientSearchPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route path='/' component={MainPage} exact />
        <Route path='/ingredients' component={IngredientSearchPage} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
