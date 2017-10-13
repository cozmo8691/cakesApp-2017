import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
} from 'react-router';

import MainContainer from './components/MainContainer';
import Home from './components/Home';
import Detail from './components/Detail';

export default (
  <Router history={browserHistory}>
    <Route path='/' component={MainContainer}>
      <IndexRoute component={Home} />
      <Route path='edit' component={Detail} />
    </Route>
  </Router>
);
