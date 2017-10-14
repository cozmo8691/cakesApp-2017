import React from 'react';
import {
  Router,
  Route,
  browserHistory,
} from 'react-router';

import MainContainer from './components/MainContainer';

export default (
  <Router history={browserHistory}>
    <Route path='/' component={MainContainer}>
      <Route path='/:id' />
    </Route>
  </Router>
);
