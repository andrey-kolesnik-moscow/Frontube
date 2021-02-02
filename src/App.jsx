import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AboutMePage from './pages/AboutMePage';
import PostPage from './pages/PostPage';
import { initialState, reducer } from './reducer';

export const StateContext = React.createContext();

function App() {
  const [users, dispatch] = React.useReducer(reducer, initialState);

  return (
    <BrowserRouter>
      <StateContext.Provider value={[users, dispatch]}>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/article/:number" component={PostPage} exact />
          <Route path="/about" component={AboutMePage} exact />
        </Switch>
      </StateContext.Provider>
    </BrowserRouter>
  );
}

export default App;
