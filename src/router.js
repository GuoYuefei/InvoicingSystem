import React from 'react';
import { Router, Route, Switch } from 'dva/router';
// import IndexPage from './routes/IndexPage';
import {MainWin} from './routes/mainWin';

function RouterConfig({ history }) {
  return (
    <Router history={history}>



      <Switch>
        <Route path="/" exact component={MainWin} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
