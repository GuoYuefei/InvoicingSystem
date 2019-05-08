import React from 'react';
import { Router, Route, Switch } from 'dva/router';
// import IndexPage from './routes/IndexPage';
import {MainWin} from './routes/mainWin';

function RouterConfig({ history, app }) {

  // const routerData = getRouterData(app);

  return (
    <Router history={history}>

      <Switch>
        <Route path="/" component={MainWin} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
